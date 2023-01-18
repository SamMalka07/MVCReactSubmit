using Microsoft.AspNetCore.Mvc;
using MvcReact.Data;

namespace MvcReact.Controllers
{
    public class StoreController : Controller
    {
        private readonly ApplicationDbContext _db;

        public StoreController(ApplicationDbContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult StoreList()
        {
            var getAllStores = _db.Stores.ToList();
            return Json(getAllStores);
        }
    }
}
