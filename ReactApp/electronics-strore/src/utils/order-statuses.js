/**
 * Order processing statuses
 */
export default module.exporty = {
  _statuses: [
    { statusName: "Created", value: 0 },
    { statusName: "Confirmed", value: 1 },
    { statusName: "Delivered", value: 2 },
  ],

  getStatusForNewOrder() {
    return this._statuses.find((status) => status.value === 0);
  },
};
