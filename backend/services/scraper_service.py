def extract_product_data(link):

    link_lower = link.lower()

    if "ps4" in link_lower:
        return {
            "title": "Controle PS4 Bluetooth",
            "price": 150
        }

    elif "mouse" in link_lower:
        return {
            "title": "Mouse Gamer RGB",
            "price": 80
        }

    elif "fone" in link_lower:
        return {
            "title": "Fone Bluetooth",
            "price": 120
        }

    return {
        "title": "Produto Genérico",
        "price": 100
    }