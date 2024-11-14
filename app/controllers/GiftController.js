import { AppState } from "../AppState.js";
import { Gift } from "../models/Gift.js";
import { giftService } from "../services/GiftService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

export class GiftController {
  constructor() {
    console.log('🎁');
    AppState.on('account', this.fetchGifts)
    AppState.on('gifts', this.drawGifts)
  }



  async fetchGifts() {
    try {
      await giftService.fetchGifts()
    } catch (error) {
      console.error(error);
      Pop.toast("Could Not get gifts")
    }
  }


  drawGifts() {
    let giftListHTML = ''
    AppState.gifts.forEach(gift => giftListHTML += gift.ListTemplate)
    setHTML('gifts', giftListHTML)
  }


  async createGift() {
    try {
      event.preventDefault()
      const giftForElem = event.target
      const giftData = getFormData(giftForElem)
      console.log(giftData);
      await giftService.createGift(giftData)
      console.log(giftData);
      console.log('created', AppState.gifts)
    } catch (error) {
      console.error(error);
    }
  }

  async openGift(giftId) {
    try {
      await giftService.openGift(giftId)
    } catch (error) {
      Pop.toast(error)
      console.error(error);

    }
  }


  async deleteGift(giftId) {
    try {
      const wantsToDelete = await Pop.confirm('Are you sure you want to delete this gift???')
      if (!wantsToDelete) return
      await giftService.deleteGift(giftId)

    } catch (error) {
      Pop.error(error)
    }
  }
}