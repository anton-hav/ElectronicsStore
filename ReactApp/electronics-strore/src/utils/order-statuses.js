/**
 * Order processing statuses
 */
export default module.exporty = {
  _statuses: [
    { statusName: "Created", value: 0 },
    { statusName: "Confirmed", value: 1 },
    { statusName: "Delivered", value: 2 },
    { statusName: "Cancelled", value: 3 },
  ],

  getStatusForNewOrder() {
    return this._statuses.find((status) => status.value === 0);
  },

  getStatusByValue(value) {
    return this._statuses.find((status) => status.value === value);
  },

  /**
   * Get statuses
   * @returns an array of statuses.
   */
  getStatuses() {
    return this._statuses;
  },
};
