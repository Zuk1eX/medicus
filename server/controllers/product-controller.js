const productService = require("../services/product-service");

class ProductController {
    async getProduct(req, res, next) {
        try {
            const productId = req.params.id;
            const productData = await productService.getProductByIdFormat(
                productId
            );
            if (!productData) {
                return res
                    .status(404)
                    .json({ Error: "Product with this ID not found" });
            }
            return res.json(productData);
        } catch (e) {
            next(e);
        }
    }

    async incrementViews(req, res, next) {
        try {
            const productId = req.params.id;
            await productService.incrementField(productId, "views");
            return res.json({ Message: "Product views incremented" });
        } catch (e) {
            next(e);
        }
    }

    async getRandom(req, res, next) {
        try {
            const productsTitles =
                await productService.getRandomProductsTitles();
            return res.json(productsTitles);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ProductController();
