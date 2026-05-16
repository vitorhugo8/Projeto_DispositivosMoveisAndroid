from services.rules_service import analyze_rules


async def analyze_product(product_name, price):

    result = analyze_rules(
        product_name,
        price
    )

    return result