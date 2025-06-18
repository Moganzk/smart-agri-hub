# Example: Simple pest risk predictor based on temperature and humidity

def predict_pest_risk(temperature: float, humidity: float) -> str:
    """
    Predicts pest risk level based on temperature and humidity.
    Returns: 'Low', 'Medium', or 'High'
    """
    if temperature > 30 and humidity > 70:
        return "High"
    elif temperature > 25 and humidity > 60:
        return "Medium"
    else:
        return "Low"

# Example usage:
if __name__ == "__main__":
    temp = 28.0
    hum = 65.0
    risk = predict_pest_risk(temp, hum)
    print(f"Pest risk for T={temp}°C, H={hum}%: {risk}")