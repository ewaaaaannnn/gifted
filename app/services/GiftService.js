import { AppState } from "../AppState.js";
import { baseURL } from "../env.js"
import { Gift } from "../models/Gift.js";
import { api } from "./AxiosService.js";


class GiftService {



  async fetchGifts() {
    const response = await api.get('api/gifts')
    console.log(response.data);
    const gifts = response.data.map(giftData => new Gift(giftData))
    AppState.gifts = gifts
  }

  async createGift(giftData) {
    const response = await api.post('api/gifts', giftData)
    console.log(response.data);
    const createGift = new Gift(response.data)
    AppState.gifts.push(createGift)

  }


  async openGift(giftId) {
    const giftData = { opened: true }
    const response = await api.put(`api/gifts/${giftId}`, giftData)
    console.log('Opened Gift', response.data);
    const openGift = new Gift(response.data)
    const giftIndex = AppState.gifts.findIndex(gift => gift.id == giftId)
    AppState.gifts.splice(giftIndex, 1, openGift)

  }

  async deleteGift(giftId) {
    const response = await api.delete(`api/gifts/${giftId}`)
    console.log('Deleted Gift', response.data);
    const giftIndex = AppState.gifts.findIndex(gift => gift.id == giftId)
    AppState.gifts.splice(giftIndex, 1)

  }



}

export const giftService = new GiftService()