def predict_weather_condition(temperature: float, humidity: float) -> str:
    """
    Predicts basic weather condition based on temperature and humidity.
    Returns: 'Sunny', 'Cloudy', or 'Rainy'
    """
    if humidity > 80:
        return "Rainy"
    elif humidity > 60:
        return "Cloudy"
    else:
        return "Sunny"

# Example usage:
if __name__ == "__main__":
    temp = 26.0
    hum = 85.0
    condition = predict_weather_condition(temp, hum)
    print(f"Weather for T={temp}°C, H={hum}%: {condition}")