const pool = require('../util/database');
const Cart = require('../models/cart');

module.exports = class Product {
    constructor({id, title, imageUrl, price, description}) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    async save() {
        let conn;
        try {
            // Берем свободное соединение из пула
            conn = await pool.getConnection();

            // Выполняем запрос
            const rows = await conn.query("INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
                [this.title, this.price, this.imageUrl, this.description]);

            // Возвращаем первую найденную строку (или null)
            return rows[0] || null;

        } catch (err) {
            console.error("Ошибка при работе с БД:", err);
            throw err;
        } finally {
            // ОБЯЗАТЕЛЬНО: Возвращаем соединение обратно в пул
            if (conn) conn.release();
        }
    }

    static deleteById(id) {
        return pool.execute("DELETE FROM products WHERE id = ?", [id]);
    }

    static fetchAll() {
        return pool.execute("SELECT * FROM  products");
    }

    static findById(id) {
        return pool.execute("SELECT * FROM  products WHERE products.id = ?", [id]);
    }
}