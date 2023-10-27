const enum BetType {
    // Внешние ставки.
    Column1st,
    Column2nd,
    Column3rd,
    Dozen1st,
    Dozen2nd,
    Dozen3rd,
    Red,
    Black,
    Low,
    High,
    Even,
    Odd,

    // Внутренние ставки.
    Straight,
    Split,
    Street,
    Corner,
    Line
}

export default BetType