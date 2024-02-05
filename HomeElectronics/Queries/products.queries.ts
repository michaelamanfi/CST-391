export const productQueries = {
    readProducts:
      `SELECT
        productId, name, brand, category, description, price, quantity, url, imageUrl
       FROM homeelectronics.products
      `,    
    readProductById:
      `SELECT
        productId, name, brand, category, description, price, quantity, url, imageUrl
       FROM homeelectronics.products WHERE productId = ?
      `,       
    createProduct:
      `INSERT INTO homeelectronics.products(name,brand, category, description, price, quantity, url, imageUrl) VALUES(?,?,?,?,?,?,?,?)
      `,
    updateProduct:
      `UPDATE homeelectronics.products
       SET name = ?, brand = ?, category = ?, description = ?, price = ?, quantity = ?, url = ?, imageUrl = ?
       WHERE productId = ?
      `,
    deleteProduct:
      `DELETE FROM homeelectronics.products
       WHERE productId = ?
      `,
  }
