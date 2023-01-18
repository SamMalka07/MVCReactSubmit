using Microsoft.EntityFrameworkCore;
using MvcReact.Models;

namespace MvcReact.Data
{
    public class ApplicationDbContext :DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Store> Stores { get; set; }    

        public DbSet<Sale> Sales { get; set; }
    }
}
