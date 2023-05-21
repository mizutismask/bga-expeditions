class CardsManager extends CardManager<Destination> {
    constructor(public game: ExpeditionsGame) {
        super(game, {
            animationManager: game.animationManager,
            getId: (card) => `destination-card-${card.id}`,
            setupDiv: (card: Destination, div: HTMLElement) => {
                div.classList.add("destination-card");
                div.dataset.cardId = "" + card.id;
                div.dataset.cardType = "" + card.type;
            },
            setupFrontDiv: (card: Destination, div: HTMLElement) => {
                this.setFrontBackground(div as HTMLDivElement, card.type_arg);
                //this.setDivAsCard(div as HTMLDivElement, card.type);
                div.id = `${super.getId(card)}-front`;

                const info: HTMLDivElement = document.createElement("div");
                info.id = `${super.getId(card)}-front-info`;
                info.innerText = "?";
                info.classList.add("css-icon", "card-info");
                div.appendChild(info);
                const cardTypeId = card.type * 100 + card.type_arg;
                (this.game as any).addTooltipHtml(info.id, this.getTooltip(card, cardTypeId));
            },
            setupBackDiv: (card: Destination, div: HTMLElement) => {
                div.style.backgroundImage = `url('${g_gamethemeurl}img/destination-card-background.jpg')`;
            },
        });
    }

    public setupCards(stocks: Stock[]) {
        stocks.forEach((stock) => {
            const destinationsUrl = `${g_gamethemeurl}img/destinations.jpg`;
            for (let id = 1; id <= 80; id++) {
                stock.addItemType(100 + id, 100 + id, destinationsUrl, id - 1);
            }
        });
    }

    public addCardsToStock(stock: Stock, cards: Destination[], from?: string) {
        if (!cards.length) {
            return;
        }

        cards.forEach((card) => {
            stock.addToStockWithId(card.type, `${card.id}`, from);
        });
    }

    public moveToAnotherStock(sourceStock: Stock, destinationStock: Stock, card: Destination) {
        if (sourceStock === destinationStock) {
            return;
        }

        const sourceStockItemId = `${sourceStock.container_div.id}_item_${card.id}`;
        if (document.getElementById(sourceStockItemId)) {
            this.addCardsToStock(destinationStock, [card], sourceStockItemId);
            //destinationStock.addToStockWithId(uniqueId, cardId, sourceStockItemId);
            sourceStock.removeFromStockById(`${card.id}`);
        } else {
            console.warn(`${sourceStockItemId} not found in `, sourceStock);
            //destinationStock.addToStockWithId(uniqueId, cardId, sourceStock.container_div.id);
            this.addCardsToStock(destinationStock, [card], sourceStock.container_div.id);
        }
    }

    public getCardName(cardTypeId: number) {
        return getCityName(cardTypeId);
    }

    public getTooltip(card: Destination, cardUniqueId: number) {
        const destination = DESTINATIONS.find((d) => d.id == cardUniqueId);
        let tooltip = `
		<div class="xpd-city-zoom-wrapper">
			<div id="xpd-city-${cardUniqueId}-zoom" class="xpd-city-zoom" style="${getBackgroundInlineStyleForDestination(
            card
        )}"></div>
			<div class="xpd-city-zoom-desc-wrapper">
				<div class="xpd-city">${dojo.string.substitute(_("${to}"), {
                    to: getCityName(destination.to),
                })}</div>
				<div class="xpd-location">${dojo.string.substitute(_("${location}"), {
                    location: getCityLocation(destination.to),
                })}</div>
				<div class="xpd-city-desc"><p>${dojo.string.substitute(_("${description}"), {
                    description: getCityDescription(destination.to),
                })}</p></div>
			</div>
		</div>`;
        return tooltip;
    }

    private setFrontBackground(cardDiv: HTMLDivElement, cardType: number) {
        const destinationsUrl = `${g_gamethemeurl}img/destinations.jpg`;
        cardDiv.style.backgroundImage = `url('${destinationsUrl}')`;
        const imagePosition = cardType - 1;
        const row = Math.floor(imagePosition / IMAGE_ITEMS_PER_ROW);
        const xBackgroundPercent = (imagePosition - row * IMAGE_ITEMS_PER_ROW) * 100;
        const yBackgroundPercent = row * 100;
        cardDiv.style.backgroundPositionX = `-${xBackgroundPercent}%`;
        cardDiv.style.backgroundPositionY = `-${yBackgroundPercent}%`;
        cardDiv.style.backgroundSize = `1000%`;
    }
}
