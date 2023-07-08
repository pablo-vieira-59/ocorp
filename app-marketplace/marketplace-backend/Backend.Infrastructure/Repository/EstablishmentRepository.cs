using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;
using System.Data.Entity;

namespace Backend.Infrastructure.Repository
{
    public class EstablishmentRepository : BaseRepository<Establishment>, IEstablishmentRepository
    {
        public EstablishmentRepository(Context.AppContext context) : base(context)
        {

        }

        public async Task<IQueryable<Establishment>> GetByCNPJ(string cnpj)
        {
            var result = this._context.Establishment.Where(e => e.DocumentNumber == cnpj).AsQueryable();
            await Task.CompletedTask;
            return result;
        }
    }
}
