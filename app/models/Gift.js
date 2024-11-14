import { generateId } from "../utils/GenerateId.js"

export class Gift {
  constructor(data) {
    this.id = data.id || generateId();
    this.tag = data.tag
    this.url = data.url
    this.opened = data.opened
    this.creatorId = data.creatorId
    this.profileIdsOpened = data.profileIdsOpened
  }


  get ListTemplate() {
    return `<div class="col-4">
            <div onclick="app.GiftController.openGift('${this.id}')" class="card card-size my-4">
              <div class="card-body">
                <img class=" selectable card-img" src="${this.url}" alt="">
                <h5 class="card-title">${this.tag}</h5>
                <button onclick="app.GiftController.deleteGift()" class= "btn btn-danger">Delete Gift</button>
              </div>
            </div>
          </div>`
  }
}