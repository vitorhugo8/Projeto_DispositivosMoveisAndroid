def analyze_rules(product_name, price):

    product_lower = product_name.lower()

    category = "Outros"
    recommendation = "Compra razoável"
    risk = "Baixo"
    confidence = 70

    # =========================
    # CATEGORIAS
    # =========================
    if "ps4" in product_lower:
        category = "Games"

    elif "mouse" in product_lower:
        category = "Periféricos"

    elif "fone" in product_lower:
        category = "Áudio"

    elif "teclado" in product_lower:
        category = "Periféricos"

    # =========================
    # ANÁLISE DE PREÇO
    # =========================
    if price < 100:
        recommendation = "Excelente custo-benefício"
        confidence += 20

    elif price < 200:
        recommendation = "Boa compra"
        confidence += 10

    elif price > 500:
        recommendation = "Preço acima da média"
        risk = "Médio"
        confidence -= 10

    return {
        "produto": product_name,
        "categoria": category,
        "preco": price,
        "recomendacao": recommendation,
        "risco": risk,
        "confianca": confidence
    }