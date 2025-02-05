export default class Booking {
  constructor(id, clientName, roomNumber, checkin, checkout) {
    this.id = id;
    this.clientName = clientName;
    this.roomNumber = roomNumber;
    this.checkin = checkin;
    this.checkout = checkout;
  }
}
