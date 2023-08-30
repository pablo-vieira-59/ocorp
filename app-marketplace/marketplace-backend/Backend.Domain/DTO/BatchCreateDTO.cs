namespace Backend.Domain.DTO
{
    public class BatchCreateDTO
    {
        public long SupplierId { get; set; }
        public long ProductId { get; set; }
        public long AddressId { get; set; }
        public required string Serial { get; set; }
        public decimal FreightPrice { get; set; }
        public decimal UnitPrice { get; set; }
        public int TotalUnits { get; set; }
        public Guid InvoiceImageGuid { get; set; }
        public Guid PaymentProofImageGuid { get; set; }
        public DateTime FabricatedAt { get; set; }
        public DateTime? ValidUntil { get; set; }
    }
}
