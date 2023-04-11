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
				(this.game as any).addTooltipHtml(div.id, this.getTooltip(card.type * 100 + card.type_arg));
			},
			setupBackDiv: (card: Destination, div: HTMLElement) => {
				div.style.backgroundImage = `url('${g_gamethemeurl}img/destination-card-backgroundP.jpg')`;
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

	public getTooltip(cardUniqueId: number) {
		const destination = DESTINATIONS.find((d) => d.id == cardUniqueId);
		let tooltip = `<div class="xpd-city">${dojo.string.substitute(_("${to}"), {
			to: getCityName(destination.to),
		})}</div>
		<div class="xpd-location">${dojo.string.substitute(_("${location}"), {
			location: getCityLocation(destination.to),
		})}</div>
		<div class="xpd-city-desc">${dojo.string.substitute(_("${description}"), {
			description: getCityDescription(destination.to),
		})}</div>
		`;
		return tooltip;
	}

	public setupNewCard(cardDiv: HTMLDivElement, cardType: number) {
		(this.game as any).addTooltipHtml(cardDiv.id, this.getTooltip(cardType));
		cardDiv.dataset.cardId = cardDiv.id.split("_")[2];
		cardDiv.dataset.cardType = "" + cardType;
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
	}

	public generateCardDiv(card: Destination): HTMLDivElement {
		const tempDiv: HTMLDivElement = document.createElement("div");
		tempDiv.classList.add("stockitem");
		tempDiv.style.width = `${CARD_WIDTH}px`;
		tempDiv.style.height = `${CARD_HEIGHT}px`;
		tempDiv.style.position = `relative`;
		tempDiv.style.backgroundImage = `url('${g_gamethemeurl}img/destinations.jpg')`;
		const imagePosition = (card.type % 100) - 1;
		const image_items_per_row = 10;
		var row = Math.floor(imagePosition / image_items_per_row);
		const xBackgroundPercent = (imagePosition - row * image_items_per_row) * 100;
		const yBackgroundPercent = row * 100;
		tempDiv.style.backgroundPosition = `-${xBackgroundPercent}% -${yBackgroundPercent}%`;

		document.body.appendChild(tempDiv);
		//this.setDivAsCard(tempDiv, card.type);
		//document.body.removeChild(tempDiv);

		return tempDiv;
	}
}
