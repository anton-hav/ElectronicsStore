namespace ElectronicsStore.WebAPI.Models.Requests
{
    /// <summary>
    /// Request model to get goods
    /// </summary>
    public class GetGoodsRequestModel
    {
        /// <summary>
        /// Search parameter that represents the page number.
        /// The default value is 1.
        /// </summary>
        public int PageNumber { get; set; } = 1;

        /// <summary>
        /// Search parameter that represents the number of goods on the page.
        /// The default value is 10.
        /// </summary>
        public int PageSize { get; set; } = 10;
    }
}
