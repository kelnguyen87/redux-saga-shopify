

export default async function fetchSmart(data){
    if(data.length){
        return data.map((result, index) => {

            const nodes = result.node;
            const nodesImages = nodes.images.edges;
            const variants = nodes.variants.edges;

            const allimages = nodesImages.map((result, index) => {
                const nodes = result.node;
                const imagePath = nodes.transformedSrc;
                return {
                    _imagePath: `${imagePath}`
                };

            });

            const allvariants = variants.map((result, index) => {
                const nodes = result.node;

                const price = nodes.price;
                const compareAtPrice = nodes.compareAtPrice;
                return {
                    _price: `${price}`,
                    _compareAtPrice: `${compareAtPrice}`
                };

            });

            const ImageUrl2 = allimages[1] !== undefined ? `${allimages[1]._imagePath}`: null

            return {
                Id: `${nodes.id}`,
                Handle: `${nodes.handle}`,
                Title: `${nodes.title}`,
                Vendor: `${nodes.vendor}`,
                Inventory: 5,
                Description: `${nodes.descriptionHtml}`,
                Price: `${allvariants[0]._price}`,
                Discount_price: `${allvariants[0]._compareAtPrice}`,
                ImageUrl: `${allimages[0]._imagePath}`,
                ImageUrl2: ImageUrl2,

            };

        });
    }else{

        const nodes = data;
        const nodesImages = nodes.images.edges;
        const variants = nodes.variants.edges;

        const allimages = nodesImages.map((result, index) => {
            const nodes = result.node;
            const imagePath = nodes.transformedSrc;
            return {
                _imagePath: `${imagePath}`
            };

        });

        const allvariants = variants.map((result, index) => {
            const nodes = result.node;

            const price = nodes.price;
            const compareAtPrice = nodes.compareAtPrice;
            return {
                _price: `${price}`,
                _compareAtPrice: `${compareAtPrice}`
            };

        });

        const ImageUrl2 = allimages[1] !== undefined ? `${allimages[1]._imagePath}`: null;

        return {
            Id: `${nodes.id}`,
            Handle: `${nodes.handle}`,
            Title: `${nodes.title}`,
            Vendor: `${nodes.vendor}`,
            Inventory: 5,
            productType: `${nodes.productType}`,
            Description: `${nodes.descriptionHtml}`,
            Price: `${allvariants[0]._price}`,
            Discount_price: `${allvariants[0]._compareAtPrice}`,
            ImageUrl: `${allimages[0]._imagePath}`,
            ImageUrl2: ImageUrl2,

        };
    }
}

export   function fetchCollection(data){
    const nodes = data;
    const nodesProduct = nodes.products.edges;
    const originalSrc = nodes.image !== null ? nodes.image.originalSrc : null;

    const getProduct = nodesProduct.map((result, index) => {
        const nodes = result.node;
        const nodesImages = nodes.images.edges;
        const variants = nodes.variants.edges;

        const allimages = nodesImages.map((result, index) => {
            const nodes = result.node;
            const imagePath = nodes.transformedSrc;
            return {
                _imagePath: `${imagePath}`
            };

        });

        const allvariants = variants.map((result, index) => {
            const nodes = result.node;

            const price = nodes.price;
            const compareAtPrice = nodes.compareAtPrice;
            return {
                _price: `${price}`,
                _compareAtPrice: `${compareAtPrice}`
            };

        });

        const ImageUrl2 = allimages[1] !== undefined ? `${allimages[1]._imagePath}`: null

        return {
            Id: `${nodes.id}`,
            Handle: `${nodes.handle}`,
            Title: `${nodes.title}`,
            Vendor: `${nodes.vendor}`,
            Inventory: 5,
            Description: `${nodes.descriptionHtml}`,
            Price: `${allvariants[0]._price}`,
            Discount_price: `${allvariants[0]._compareAtPrice}`,
            ImageUrl: `${allimages[0]._imagePath}`,
            ImageUrl2: ImageUrl2,

        };

    });

    return{
        Id: `${nodes.id}`,
        Title: `${nodes.title}`,
        Description: `${nodes.description}`,
        image: `${originalSrc}`,
        products: getProduct
    }
}
