CREATE TABLE order_products(
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES products(id),
    quantity BIGINT
)
