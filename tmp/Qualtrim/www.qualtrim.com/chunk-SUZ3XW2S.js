import {
    g as dt,
    pa as pt,
    w as mt
} from "./chunk-7LZCJGQ2.js";
import {
    a as P,
    b as Y
} from "./chunk-TXK3PDXI.js";
var Vt = (function(t) {
        return t.Price = "price", t.Revenue = "revenue", t.RevenueBySegment = "revenueBySegment", t.EBITDA = "ebitda", t.FreeCashFlow = "freeCashFlow", t.NetIncome = "netIncome", t.EPS = "eps", t.CashAndDebt = "cashAndDebt", t.Dividend = "dividend", t.SharesOutstanding = "sharedOutstanding", t.Ratios = "ratios", t.Valutation = "valuation", t.Expenses = "expenses", t.EmployeeCount = "employeeCount", t.ReturnOfCapital = "ReturnOfCapital", t
    })(Vt || {}),
    Zt = (function(t) {
        return t.Day = "day", t.Month = "month", t.Quarter = "quarter", t.QuarterTTM = "quarterTTM", t.Annual = "annual", t
    })(Zt || {}),
    N = (function(t) {
        return t.SNP500 = "SPY", t.MostTrending = "BUZZ", t.Growth = "SCHG", t.DividendGrowth = "SCHD", t.BuybackMachines = "PKW", t.ArtificialIntelligence = "WTAI", t.Cloud = "SKYY", t.ElectricVehicles = "IDRV", t.LeisureAndEntertainment = "PEJ", t.Fintech = "FINX", t.DigitalHealthcare = "FDHT", t.Battery = "LIT", t.Cybersecurity = "BUG", t
    })(N || {}),
    Ya = {
        [N.SNP500]: "S&P 500",
        [N.MostTrending]: "Most Trending",
        [N.Growth]: "Growth",
        [N.DividendGrowth]: "Dividend Growth",
        [N.BuybackMachines]: "Buyback Machines",
        [N.ArtificialIntelligence]: "Artificial Intelligence",
        [N.Cloud]: "Cloud",
        [N.ElectricVehicles]: "Electric Vehicles",
        [N.LeisureAndEntertainment]: "Leisure and Entertainment",
        [N.Fintech]: "Fintech",
        [N.DigitalHealthcare]: "Digital Healthcare",
        [N.Battery]: "Battery",
        [N.Cybersecurity]: "Cybersecurity"
    },
    Qt = (function(t) {
        return t.Bar = "bar", t.Line = "line", t.StackedBar = "stackedBar", t
    })(Qt || {}),
    Jt = (function(t) {
        return t.Number = "number", t.Percent = "percent", t.Currency = "currency", t
    })(Jt || {}),
    jt = (function(t) {
        return t.Sale = "S-Sale", t.Exempt = "M-Exempt", t.Award = "A-Award", t.Purchase = "P-Purchase", t.InKind = "F-InKind", t
    })(jt || {}),
    er = (function(t) {
        return t.EPS = "eps", t.Revenue = "revenue", t.NetIncome = "netIncome", t.EBITDA = "ebitda", t
    })(er || {}),
    v = (function(t) {
        return t.NASDAQ = "NASDAQ", t.NYSEAndNASDAQ = "NYSE,NASDAQ", t.NYSE = "NYSE", t.AMEX = "AMEX", t.EURONEXT = "EURONEXT", t.COMMODITY = "COMMODITY", t.INDEX = "INDEX", t.CRYPTO = "CRYPTO", t.LSE = "LSE", t.TSX = "TSX", t.FOREX = "FOREX", t.XETRA = "XETRA", t.NSE = "NSE", t.ASX = "ASX", t.HXSE = "HKSE", t.WSE = "WSE", t.KS = "KSE", t.NEO = "NEO", t.AMS = "AMS", t
    })(v || {}),
    La = {
        [v.NYSE]: "USD",
        [v.NASDAQ]: "USD",
        [v.AMEX]: "USD",
        [v.INDEX]: "USD",
        [v.TSX]: "CAD",
        [v.EURONEXT]: "EUR",
        [v.XETRA]: "EUR",
        [v.LSE]: "GBP",
        [v.NSE]: "INR",
        [v.ASX]: "AUD",
        [v.WSE]: "EUR",
        [v.HXSE]: "HKD",
        HX: "HKD",
        AS: "EUR",
        PA: "EUR",
        TO: "CAD",
        AX: "AUD",
        NS: "INR",
        L: "GBP",
        WA: "EUR",
        KS: "KRW",
        NEO: "CAD",
        AMS: "EUR"
    },
    Ba = [{
        value: v.NYSEAndNASDAQ,
        label: "US"
    }, {
        value: v.NYSE,
        label: "NYSE"
    }, {
        value: v.NASDAQ,
        label: "NASDAQ"
    }, {
        value: v.AMEX,
        label: "AMEX"
    }, {
        value: v.TSX,
        label: "TSX"
    }, {
        value: v.LSE,
        label: "LSE"
    }, {
        value: v.EURONEXT,
        label: "EURONEXT"
    }, {
        value: v.XETRA,
        label: "XETRA"
    }, {
        value: v.NSE,
        label: "NSE"
    }, {
        value: v.ASX,
        label: "ASX"
    }, {
        value: v.NEO,
        label: "NEO"
    }, {
        value: v.AMS,
        label: "AMS"
    }, {
        value: v.INDEX,
        label: "INDEX"
    }];
var Wa = "combined",
    _a = "Combined";
var tr = (function(t) {
        return t.Portfolio = "portfolio", t.Dividend = "dividend", t
    })(tr || {}),
    oe = (function(t) {
        return t.NASDAQ = "QQQ", t.SP500 = "SPY", t.DowJones = "DIA", t
    })(oe || {}),
    $a = {
        [oe.DowJones]: "Dow Jones",
        [oe.SP500]: "S&P 500",
        [oe.NASDAQ]: "Nasdaq"
    };
var rr = (function(t) {
    return t.FinancialStatements = "financial-statements", t.Quotes = "quotes", t.Transcripts = "transcripts", t.Forex = "forex", t.Prices = "prices", t.CompanyInfo = "company-info", t.CompanyNews = "company-news", t.Dividends = "dividends", t.EarningsCalendar = "earnings-calendar", t.Ratios = "ratios", t.InvestingTheme = "investing-theme", t.FMP = "fmp", t.FMP2 = "fmp2", t.IEX = "iex", t.Benzinga = "benzinga", t.Patreon = "patreon", t.OpenAi = "openAi", t.Stripe = "stripe", t.StockScreener = "stock-screener", t
})(rr || {});
var B = (function(t) {
    return t.Admin = "admin", t.KPI = "kpi", t.User = "user", t.Anonymous = "anonymous", t
})(B || {});

function Xa(t) {
    return "stripeStatus" in t || "priceId" in t || "stripeCustomerId" in t
}

function Va(t) {
    return "patronStatus" in t || "campaignLifetimeSupportCents" in t || "pledgeCadence" in t
}
var ar = (function(t) {
        return t.OneDay = "1D", t.FiveDay = "5D", t.OneMonth = "1M", t.ThreeMonth = "3M", t.SixMonth = "6M", t.OneYear = "1Y", t.ThreeYear = "3Y", t.FiveYear = "5Y", t.TenYear = "10Y", t.Max = "max", t.YearToDate = "ytd", t
    })(ar || {}),
    or = (function(t) {
        return t[t.TwoHundredDays = 200] = "TwoHundredDays", t[t.OneHundredDays = 100] = "OneHundredDays", t[t.FiftyDays = 50] = "FiftyDays", t[t.TenDays = 10] = "TenDays", t
    })(or || {});

function nr(t, e) {
    if (t) return t.stocks[e] || t.currencies[e]
}

function ja(t) {
    return [...Object.keys(t.stocks), ...Object.keys(t.currencies)]
}

function eo(t, e, r) {
    let a = t[e];
    if (a) return nr(a, r)
}

function to(t, e) {
    return t[e]
}
var ir = (function(t) {
    return t.High = "high", t.Medium = "medium", t.Low = "low", t
})(ir || {});
var sr = (function(t) {
        return t.MarketCap100B = "marketCap100B", t.MarketCap10B = "marketCap10B", t.MarketCap1B = "marketCap1B", t
    })(sr || {}),
    lr = (function(t) {
        return t.BeforeOpen = "beforeOpen", t.DuringMarket = "duringMarket", t.AfterClose = "afterClose", t
    })(lr || {}),
    cr = (function(t) {
        return t.Revenue = "revenue", t.EPS = "eps", t
    })(cr || {});
var lo = {
    USD: {
        symbol: "$",
        name: "US Dollar",
        symbolNative: "$",
        decimalDigits: 2,
        rounding: 0,
        code: "USD",
        namePlural: "US dollars",
        locale: "en"
    },
    GBP: {
        symbol: "\xA3",
        name: "British Pound Sterling",
        symbolNative: "\xA3",
        decimalDigits: 2,
        rounding: 0,
        code: "GBP",
        namePlural: "British pounds sterling",
        locale: "en-GB"
    },
    GBp: {
        symbol: "p",
        name: "British Penny",
        symbolNative: "p",
        decimalDigits: 2,
        rounding: 0,
        code: "GBp",
        namePlural: "British pence",
        locale: "en-GB"
    },
    EUR: {
        symbol: "\u20AC",
        name: "Euro",
        symbolNative: "\u20AC",
        decimalDigits: 2,
        rounding: 0,
        code: "EUR",
        namePlural: "euros",
        locale: "en-GB"
    },
    JPY: {
        symbol: "\xA5",
        name: "Japanese Yen",
        symbolNative: "\uFFE5",
        decimalDigits: 0,
        rounding: 0,
        code: "JPY",
        namePlural: "Japanese yen",
        locale: "ja"
    },
    CAD: {
        symbol: "CA$",
        name: "Canadian Dollar",
        symbolNative: "$",
        decimalDigits: 2,
        rounding: 0,
        code: "CAD",
        namePlural: "Canadian dollars",
        locale: "en"
    },
    AUD: {
        symbol: "AU$",
        name: "Australian Dollar",
        symbolNative: "$",
        decimalDigits: 2,
        rounding: 0,
        code: "AUD",
        namePlural: "Australian dollars",
        locale: "en"
    },
    HKD: {
        symbol: "HK$",
        name: "Hong Kong Dollar",
        symbolNative: "$",
        decimalDigits: 2,
        rounding: 0,
        code: "HKD",
        namePlural: "Hong Kong dollars",
        locale: "en"
    },
    AED: {
        symbol: "AED",
        name: "United Arab Emirates Dirham",
        symbolNative: "\u062F.\u0625.\u200F",
        decimalDigits: 2,
        rounding: 0,
        code: "AED",
        namePlural: "UAE dirhams",
        locale: "en"
    },
    AFN: {
        symbol: "Af",
        name: "Afghan Afghani",
        symbolNative: "\u060B",
        decimalDigits: 2,
        rounding: 0,
        code: "AFN",
        namePlural: "Afghan Afghanis",
        locale: "en"
    },
    ALL: {
        symbol: "ALL",
        name: "Albanian Lek",
        symbolNative: "Lek",
        decimalDigits: 2,
        rounding: 0,
        code: "ALL",
        namePlural: "Albanian lek\xEB",
        locale: "en"
    },
    AMD: {
        symbol: "AMD",
        name: "Armenian Dram",
        symbolNative: "\u0564\u0580.",
        decimalDigits: 2,
        rounding: 0,
        code: "AMD",
        namePlural: "Armenian drams",
        locale: "en"
    },
    ARS: {
        symbol: "AR$",
        name: "Argentine Peso",
        symbolNative: "$",
        decimalDigits: 2,
        rounding: 0,
        code: "ARS",
        namePlural: "Argentine pesos",
        locale: "en"
    },
    AZN: {
        symbol: "man.",
        name: "Azerbaijani Manat",
        symbolNative: "\u043C\u0430\u043D.",
        decimalDigits: 2,
        rounding: 0,
        code: "AZN",
        namePlural: "Azerbaijani manats",
        locale: "en"
    },
    BAM: {
        symbol: "KM",
        name: "Bosnia-Herzegovina Convertible Mark",
        symbolNative: "KM",
        decimalDigits: 2,
        rounding: 0,
        code: "BAM",
        namePlural: "Bosnia-Herzegovina convertible marks",
        locale: "en"
    },
    BDT: {
        symbol: "Tk",
        name: "Bangladeshi Taka",
        symbolNative: "\u09F3",
        decimalDigits: 2,
        rounding: 0,
        code: "BDT",
        namePlural: "Bangladeshi takas",
        locale: "en"
    },
    BGN: {
        symbol: "BGN",
        name: "Bulgarian Lev",
        symbolNative: "\u043B\u0432.",
        decimalDigits: 2,
        rounding: 0,
        code: "BGN",
        namePlural: "Bulgarian leva",
        locale: "en"
    },
    BHD: {
        symbol: "BD",
        name: "Bahraini Dinar",
        symbolNative: "\u062F.\u0628.\u200F",
        decimalDigits: 3,
        rounding: 0,
        code: "BHD",
        namePlural: "Bahraini dinars",
        locale: "en"
    },
    BIF: {
        symbol: "FBu",
        name: "Burundian Franc",
        symbolNative: "FBu",
        decimalDigits: 0,
        rounding: 0,
        code: "BIF",
        namePlural: "Burundian francs",
        locale: "en"
    },
    BND: {
        symbol: "BN$",
        name: "Brunei Dollar",
        symbolNative: "$",
        decimalDigits: 2,
        rounding: 0,
        code: "BND",
        namePlural: "Brunei dollars",
        locale: "en"
    },
    BOB: {
        symbol: "Bs",
        name: "Bolivian Boliviano",
        symbolNative: "Bs",
        decimalDigits: 2,
        rounding: 0,
        code: "BOB",
        namePlural: "Bolivian bolivianos",
        locale: "en"
    },
    BRL: {
        symbol: "R$",
        name: "Brazilian Real",
        symbolNative: "R$",
        decimalDigits: 2,
        rounding: 0,
        code: "BRL",
        namePlural: "Brazilian reals",
        locale: "en"
    },
    BWP: {
        symbol: "BWP",
        name: "Botswanan Pula",
        symbolNative: "P",
        decimalDigits: 2,
        rounding: 0,
        code: "BWP",
        namePlural: "Botswanan pulas",
        locale: "en"
    },
    BYR: {
        symbol: "BYR",
        name: "Belarusian Ruble",
        symbolNative: "BYR",
        decimalDigits: 0,
        rounding: 0,
        code: "BYR",
        namePlural: "Belarusian rubles",
        locale: "en"
    },
    BZD: {
        symbol: "BZ$",
        name: "Belize Dollar",
        symbolNative: "$",
        decimalDigits: 2,
        rounding: 0,
        code: "BZD",
        namePlural: "Belize dollars",
        locale: "en"
    },
    CDF: {
        symbol: "CDF",
        name: "Congolese Franc",
        symbolNative: "FrCD",
        decimalDigits: 2,
        rounding: 0,
        code: "CDF",
        namePlural: "Congolese francs",
        locale: "en"
    },
    CHF: {
        symbol: "CHF",
        name: "Swiss Franc",
        symbolNative: "CHF",
        decimalDigits: 2,
        rounding: .05,
        code: "CHF",
        namePlural: "Swiss francs",
        locale: "de"
    },
    CLP: {
        symbol: "CL$",
        name: "Chilean Peso",
        symbolNative: "$",
        decimalDigits: 0,
        rounding: 0,
        code: "CLP",
        namePlural: "Chilean pesos",
        locale: "en"
    },
    CNY: {
        symbol: "CN\xA5",
        name: "Chinese Yuan",
        symbolNative: "CN\xA5",
        decimalDigits: 2,
        rounding: 0,
        code: "CNY",
        namePlural: "Chinese yuan",
        locale: "en"
    },
    COP: {
        symbol: "CO$",
        name: "Colombian Peso",
        symbolNative: "$",
        decimalDigits: 2,
        rounding: 0,
        code: "COP",
        namePlural: "Colombian pesos",
        locale: "en"
    },
    CRC: {
        symbol: "\u20A1",
        name: "Costa Rican Col\xF3n",
        symbolNative: "\u20A1",
        decimalDigits: 2,
        rounding: 0,
        code: "CRC",
        namePlural: "Costa Rican col\xF3ns",
        locale: "en"
    },
    CVE: {
        symbol: "CV$",
        name: "Cape Verdean Escudo",
        symbolNative: "CV$",
        decimalDigits: 2,
        rounding: 0,
        code: "CVE",
        namePlural: "Cape Verdean escudos",
        locale: "en"
    },
    CZK: {
        symbol: "K\u010D",
        name: "Czech Republic Koruna",
        symbolNative: "K\u010D",
        decimalDigits: 2,
        rounding: 0,
        code: "CZK",
        namePlural: "Czech Republic korunas",
        locale: "en"
    },
    DJF: {
        symbol: "Fdj",
        name: "Djiboutian Franc",
        symbolNative: "Fdj",
        decimalDigits: 0,
        rounding: 0,
        code: "DJF",
        namePlural: "Djiboutian francs",
        locale: "en"
    },
    DKK: {
        symbol: "Dkr",
        name: "Danish Krone",
        symbolNative: "kr",
        decimalDigits: 2,
        rounding: 0,
        code: "DKK",
        namePlural: "Danish kroner",
        locale: "da"
    },
    DOP: {
        symbol: "RD$",
        name: "Dominican Peso",
        symbolNative: "RD$",
        decimalDigits: 2,
        rounding: 0,
        code: "DOP",
        namePlural: "Dominican pesos",
        locale: "en"
    },
    DZD: {
        symbol: "DA",
        name: "Algerian Dinar",
        symbolNative: "\u062F.\u062C.\u200F",
        decimalDigits: 2,
        rounding: 0,
        code: "DZD",
        namePlural: "Algerian dinars",
        locale: "en"
    },
    EEK: {
        symbol: "Ekr",
        name: "Estonian Kroon",
        symbolNative: "kr",
        decimalDigits: 2,
        rounding: 0,
        code: "EEK",
        namePlural: "Estonian kroons",
        locale: "en"
    },
    EGP: {
        symbol: "EGP",
        name: "Egyptian Pound",
        symbolNative: "\u062C.\u0645.\u200F",
        decimalDigits: 2,
        rounding: 0,
        code: "EGP",
        namePlural: "Egyptian pounds",
        locale: "en"
    },
    ERN: {
        symbol: "Nfk",
        name: "Eritrean Nakfa",
        symbolNative: "Nfk",
        decimalDigits: 2,
        rounding: 0,
        code: "ERN",
        namePlural: "Eritrean nakfas",
        locale: "en"
    },
    ETB: {
        symbol: "Br",
        name: "Ethiopian Birr",
        symbolNative: "Br",
        decimalDigits: 2,
        rounding: 0,
        code: "ETB",
        namePlural: "Ethiopian birrs",
        locale: "en"
    },
    GEL: {
        symbol: "GEL",
        name: "Georgian Lari",
        symbolNative: "GEL",
        decimalDigits: 2,
        rounding: 0,
        code: "GEL",
        namePlural: "Georgian laris",
        locale: "en"
    },
    GHS: {
        symbol: "GH\u20B5",
        name: "Ghanaian Cedi",
        symbolNative: "GH\u20B5",
        decimalDigits: 2,
        rounding: 0,
        code: "GHS",
        namePlural: "Ghanaian cedis",
        locale: "en"
    },
    GNF: {
        symbol: "FG",
        name: "Guinean Franc",
        symbolNative: "FG",
        decimalDigits: 0,
        rounding: 0,
        code: "GNF",
        namePlural: "Guinean francs",
        locale: "en"
    },
    GTQ: {
        symbol: "GTQ",
        name: "Guatemalan Quetzal",
        symbolNative: "Q",
        decimalDigits: 2,
        rounding: 0,
        code: "GTQ",
        namePlural: "Guatemalan quetzals",
        locale: "en"
    },
    HNL: {
        symbol: "HNL",
        name: "Honduran Lempira",
        symbolNative: "L",
        decimalDigits: 2,
        rounding: 0,
        code: "HNL",
        namePlural: "Honduran lempiras",
        locale: "en"
    },
    HRK: {
        symbol: "kn",
        name: "Croatian Kuna",
        symbolNative: "kn",
        decimalDigits: 2,
        rounding: 0,
        code: "HRK",
        namePlural: "Croatian kunas",
        locale: "en"
    },
    HUF: {
        symbol: "Ft",
        name: "Hungarian Forint",
        symbolNative: "Ft",
        decimalDigits: 2,
        rounding: 0,
        code: "HUF",
        namePlural: "Hungarian forints",
        locale: "en"
    },
    IDR: {
        symbol: "Rp",
        name: "Indonesian Rupiah",
        symbolNative: "Rp",
        decimalDigits: 2,
        rounding: 0,
        code: "IDR",
        namePlural: "Indonesian rupiahs",
        locale: "en"
    },
    ILS: {
        symbol: "\u20AA",
        name: "Israeli New Sheqel",
        symbolNative: "\u20AA",
        decimalDigits: 2,
        rounding: 0,
        code: "ILS",
        namePlural: "Israeli new sheqels",
        locale: "en"
    },
    INR: {
        symbol: "Rs",
        name: "Indian Rupee",
        symbolNative: "\u099F\u0995\u09BE",
        decimalDigits: 2,
        rounding: 0,
        code: "INR",
        namePlural: "Indian rupees",
        locale: "en"
    },
    IQD: {
        symbol: "IQD",
        name: "Iraqi Dinar",
        symbolNative: "\u062F.\u0639.\u200F",
        decimalDigits: 3,
        rounding: 0,
        code: "IQD",
        namePlural: "Iraqi dinars",
        locale: "en"
    },
    IRR: {
        symbol: "IRR",
        name: "Iranian Rial",
        symbolNative: "\uFDFC",
        decimalDigits: 2,
        rounding: 0,
        code: "IRR",
        namePlural: "Iranian rials",
        locale: "en"
    },
    ISK: {
        symbol: "Ikr",
        name: "Icelandic Kr\xF3na",
        symbolNative: "kr",
        decimalDigits: 0,
        rounding: 0,
        code: "ISK",
        namePlural: "Icelandic kr\xF3nur",
        locale: "en"
    },
    JMD: {
        symbol: "J$",
        name: "Jamaican Dollar",
        symbolNative: "$",
        decimalDigits: 2,
        rounding: 0,
        code: "JMD",
        namePlural: "Jamaican dollars",
        locale: "en"
    },
    JOD: {
        symbol: "JD",
        name: "Jordanian Dinar",
        symbolNative: "\u062F.\u0623.\u200F",
        decimalDigits: 3,
        rounding: 0,
        code: "JOD",
        namePlural: "Jordanian dinars",
        locale: "en"
    },
    KES: {
        symbol: "Ksh",
        name: "Kenyan Shilling",
        symbolNative: "Ksh",
        decimalDigits: 2,
        rounding: 0,
        code: "KES",
        namePlural: "Kenyan shillings",
        locale: "en"
    },
    KHR: {
        symbol: "KHR",
        name: "Cambodian Riel",
        symbolNative: "\u17DB",
        decimalDigits: 2,
        rounding: 0,
        code: "KHR",
        namePlural: "Cambodian riels",
        locale: "en"
    },
    KMF: {
        symbol: "CF",
        name: "Comorian Franc",
        symbolNative: "FC",
        decimalDigits: 0,
        rounding: 0,
        code: "KMF",
        namePlural: "Comorian francs",
        locale: "en"
    },
    KRW: {
        symbol: "\u20A9",
        name: "South Korean Won",
        symbolNative: "\u20A9",
        decimalDigits: 0,
        rounding: 0,
        code: "KRW",
        namePlural: "South Korean won",
        locale: "en"
    },
    KWD: {
        symbol: "KD",
        name: "Kuwaiti Dinar",
        symbolNative: "\u062F.\u0643.\u200F",
        decimalDigits: 3,
        rounding: 0,
        code: "KWD",
        namePlural: "Kuwaiti dinars",
        locale: "en"
    },
    KZT: {
        symbol: "KZT",
        name: "Kazakhstani Tenge",
        symbolNative: "\u0442\u04A3\u0433.",
        decimalDigits: 2,
        rounding: 0,
        code: "KZT",
        namePlural: "Kazakhstani tenges",
        locale: "en"
    },
    LAK: {
        symbol: "\u20AD",
        name: "Lao kip",
        symbolNative: "\u0E81\u0EB5\u0E9A",
        decimalDigits: 2,
        rounding: 0,
        code: "LAK",
        namePlural: "Lao kips",
        locale: "en"
    },
    LBP: {
        symbol: "LB\xA3",
        name: "Lebanese Pound",
        symbolNative: "\u0644.\u0644.\u200F",
        decimalDigits: 2,
        rounding: 0,
        code: "LBP",
        namePlural: "Lebanese pounds",
        locale: "en"
    },
    LKR: {
        symbol: "SLRs",
        name: "Sri Lankan Rupee",
        symbolNative: "SL Re",
        decimalDigits: 2,
        rounding: 0,
        code: "LKR",
        namePlural: "Sri Lankan rupees",
        locale: "en"
    },
    LTL: {
        symbol: "Lt",
        name: "Lithuanian Litas",
        symbolNative: "Lt",
        decimalDigits: 2,
        rounding: 0,
        code: "LTL",
        namePlural: "Lithuanian litai",
        locale: "en"
    },
    LVL: {
        symbol: "Ls",
        name: "Latvian Lats",
        symbolNative: "Ls",
        decimalDigits: 2,
        rounding: 0,
        code: "LVL",
        namePlural: "Latvian lati",
        locale: "en"
    },
    LYD: {
        symbol: "LD",
        name: "Libyan Dinar",
        symbolNative: "\u062F.\u0644.\u200F",
        decimalDigits: 3,
        rounding: 0,
        code: "LYD",
        namePlural: "Libyan dinars",
        locale: "en"
    },
    MAD: {
        symbol: "MAD",
        name: "Moroccan Dirham",
        symbolNative: "\u062F.\u0645.\u200F",
        decimalDigits: 2,
        rounding: 0,
        code: "MAD",
        namePlural: "Moroccan dirhams",
        locale: "en"
    },
    MDL: {
        symbol: "MDL",
        name: "Moldovan Leu",
        symbolNative: "MDL",
        decimalDigits: 2,
        rounding: 0,
        code: "MDL",
        namePlural: "Moldovan lei",
        locale: "en"
    },
    MGA: {
        symbol: "MGA",
        name: "Malagasy Ariary",
        symbolNative: "MGA",
        decimalDigits: 2,
        rounding: 0,
        code: "MGA",
        namePlural: "Malagasy Ariaries",
        locale: "en"
    },
    MKD: {
        symbol: "MKD",
        name: "Macedonian Denar",
        symbolNative: "MKD",
        decimalDigits: 2,
        rounding: 0,
        code: "MKD",
        namePlural: "Macedonian denari",
        locale: "en"
    },
    MMK: {
        symbol: "MMK",
        name: "Myanma Kyat",
        symbolNative: "K",
        decimalDigits: 2,
        rounding: 0,
        code: "MMK",
        namePlural: "Myanma kyats",
        locale: "en"
    },
    MOP: {
        symbol: "MOP$",
        name: "Macanese Pataca",
        symbolNative: "MOP$",
        decimalDigits: 2,
        rounding: 0,
        code: "MOP",
        namePlural: "Macanese patacas",
        locale: "en"
    },
    MUR: {
        symbol: "MURs",
        name: "Mauritian Rupee",
        symbolNative: "MURs",
        decimalDigits: 2,
        rounding: 0,
        code: "MUR",
        namePlural: "Mauritian rupees",
        locale: "en"
    },
    MXN: {
        symbol: "MX$",
        name: "Mexican Peso",
        symbolNative: "$",
        decimalDigits: 2,
        rounding: 0,
        code: "MXN",
        namePlural: "Mexican pesos",
        locale: "en"
    },
    MYR: {
        symbol: "RM",
        name: "Malaysian Ringgit",
        symbolNative: "RM",
        decimalDigits: 2,
        rounding: 0,
        code: "MYR",
        namePlural: "Malaysian ringgits",
        locale: "en"
    },
    MZN: {
        symbol: "MTn",
        name: "Mozambican Metical",
        symbolNative: "MTn",
        decimalDigits: 2,
        rounding: 0,
        code: "MZN",
        namePlural: "Mozambican meticals",
        locale: "en"
    },
    NAD: {
        symbol: "N$",
        name: "Namibian Dollar",
        symbolNative: "N$",
        decimalDigits: 2,
        rounding: 0,
        code: "NAD",
        namePlural: "Namibian dollars",
        locale: "en"
    },
    NGN: {
        symbol: "\u20A6",
        name: "Nigerian Naira",
        symbolNative: "\u20A6",
        decimalDigits: 2,
        rounding: 0,
        code: "NGN",
        namePlural: "Nigerian nairas",
        locale: "en"
    },
    NIO: {
        symbol: "C$",
        name: "Nicaraguan C\xF3rdoba",
        symbolNative: "C$",
        decimalDigits: 2,
        rounding: 0,
        code: "NIO",
        namePlural: "Nicaraguan c\xF3rdobas",
        locale: "en"
    },
    NOK: {
        symbol: "Nkr",
        name: "Norwegian Krone",
        symbolNative: "kr",
        decimalDigits: 2,
        rounding: 0,
        code: "NOK",
        namePlural: "Norwegian kroner",
        locale: "en"
    },
    NPR: {
        symbol: "NPRs",
        name: "Nepalese Rupee",
        symbolNative: "\u0928\u0947\u0930\u0942",
        decimalDigits: 2,
        rounding: 0,
        code: "NPR",
        namePlural: "Nepalese rupees",
        locale: "en"
    },
    NZD: {
        symbol: "NZ$",
        name: "New Zealand Dollar",
        symbolNative: "$",
        decimalDigits: 2,
        rounding: 0,
        code: "NZD",
        namePlural: "New Zealand dollars",
        locale: "en"
    },
    OMR: {
        symbol: "OMR",
        name: "Omani Rial",
        symbolNative: "\u0631.\u0639.\u200F",
        decimalDigits: 3,
        rounding: 0,
        code: "OMR",
        namePlural: "Omani rials",
        locale: "en"
    },
    PAB: {
        symbol: "B/.",
        name: "Panamanian Balboa",
        symbolNative: "B/.",
        decimalDigits: 2,
        rounding: 0,
        code: "PAB",
        namePlural: "Panamanian balboas",
        locale: "en"
    },
    PEN: {
        symbol: "S/.",
        name: "Peruvian Nuevo Sol",
        symbolNative: "S/.",
        decimalDigits: 2,
        rounding: 0,
        code: "PEN",
        namePlural: "Peruvian nuevos soles",
        locale: "en"
    },
    PHP: {
        symbol: "\u20B1",
        name: "Philippine Peso",
        symbolNative: "\u20B1",
        decimalDigits: 2,
        rounding: 0,
        code: "PHP",
        namePlural: "Philippine pesos",
        locale: "en"
    },
    PKR: {
        symbol: "PKRs",
        name: "Pakistani Rupee",
        symbolNative: "\u20A8",
        decimalDigits: 2,
        rounding: 0,
        code: "PKR",
        namePlural: "Pakistani rupees",
        locale: "en"
    },
    PLN: {
        symbol: "z\u0142",
        name: "Polish Zloty",
        symbolNative: "z\u0142",
        decimalDigits: 2,
        rounding: 0,
        code: "PLN",
        namePlural: "Polish zlotys",
        locale: "en"
    },
    PYG: {
        symbol: "\u20B2",
        name: "Paraguayan Guarani",
        symbolNative: "\u20B2",
        decimalDigits: 0,
        rounding: 0,
        code: "PYG",
        namePlural: "Paraguayan guaranis",
        locale: "en"
    },
    QAR: {
        symbol: "QR",
        name: "Qatari Rial",
        symbolNative: "\u0631.\u0642.\u200F",
        decimalDigits: 2,
        rounding: 0,
        code: "QAR",
        namePlural: "Qatari rials",
        locale: "en"
    },
    RON: {
        symbol: "RON",
        name: "Romanian Leu",
        symbolNative: "RON",
        decimalDigits: 2,
        rounding: 0,
        code: "RON",
        namePlural: "Romanian lei",
        locale: "en"
    },
    RSD: {
        symbol: "din.",
        name: "Serbian Dinar",
        symbolNative: "\u0434\u0438\u043D.",
        decimalDigits: 2,
        rounding: 0,
        code: "RSD",
        namePlural: "Serbian dinars",
        locale: "en"
    },
    RUB: {
        symbol: "RUB",
        name: "Russian Ruble",
        symbolNative: "\u20BD",
        decimalDigits: 2,
        rounding: 0,
        code: "RUB",
        namePlural: "Russian rubles",
        locale: "en"
    },
    RWF: {
        symbol: "RWF",
        name: "Rwandan Franc",
        symbolNative: "FR",
        decimalDigits: 0,
        rounding: 0,
        code: "RWF",
        namePlural: "Rwandan francs",
        locale: "en"
    },
    SAR: {
        symbol: "SR",
        name: "Saudi Riyal",
        symbolNative: "\u0631.\u0633.\u200F",
        decimalDigits: 2,
        rounding: 0,
        code: "SAR",
        namePlural: "Saudi riyals",
        locale: "en"
    },
    SDG: {
        symbol: "SDG",
        name: "Sudanese Pound",
        symbolNative: "SDG",
        decimalDigits: 2,
        rounding: 0,
        code: "SDG",
        namePlural: "Sudanese pounds",
        locale: "en"
    },
    SEK: {
        symbol: "Skr",
        name: "Swedish Krona",
        symbolNative: "kr",
        decimalDigits: 2,
        rounding: 0,
        code: "SEK",
        namePlural: "Swedish kronor",
        locale: "en"
    },
    SGD: {
        symbol: "S$",
        name: "Singapore Dollar",
        symbolNative: "$",
        decimalDigits: 2,
        rounding: 0,
        code: "SGD",
        namePlural: "Singapore dollars",
        locale: "en"
    },
    SOS: {
        symbol: "Ssh",
        name: "Somali Shilling",
        symbolNative: "Ssh",
        decimalDigits: 2,
        rounding: 0,
        code: "SOS",
        namePlural: "Somali shillings",
        locale: "en"
    },
    SYP: {
        symbol: "SY\xA3",
        name: "Syrian Pound",
        symbolNative: "\u0644.\u0633.\u200F",
        decimalDigits: 2,
        rounding: 0,
        code: "SYP",
        namePlural: "Syrian pounds",
        locale: "en"
    },
    THB: {
        symbol: "\u0E3F",
        name: "Thai Baht",
        symbolNative: "\u0E3F",
        decimalDigits: 2,
        rounding: 0,
        code: "THB",
        namePlural: "Thai baht",
        locale: "en"
    },
    TND: {
        symbol: "DT",
        name: "Tunisian Dinar",
        symbolNative: "\u062F.\u062A.\u200F",
        decimalDigits: 3,
        rounding: 0,
        code: "TND",
        namePlural: "Tunisian dinars",
        locale: "en"
    },
    TOP: {
        symbol: "T$",
        name: "Tongan Pa\u02BBanga",
        symbolNative: "T$",
        decimalDigits: 2,
        rounding: 0,
        code: "TOP",
        namePlural: "Tongan pa\u02BBanga",
        locale: "en"
    },
    TRY: {
        symbol: "TL",
        name: "Turkish Lira",
        symbolNative: "TL",
        decimalDigits: 2,
        rounding: 0,
        code: "TRY",
        namePlural: "Turkish Lira",
        locale: "en"
    },
    TTD: {
        symbol: "TT$",
        name: "Trinidad and Tobago Dollar",
        symbolNative: "$",
        decimalDigits: 2,
        rounding: 0,
        code: "TTD",
        namePlural: "Trinidad and Tobago dollars",
        locale: "en"
    },
    TWD: {
        symbol: "NT$",
        name: "New Taiwan Dollar",
        symbolNative: "NT$",
        decimalDigits: 2,
        rounding: 0,
        code: "TWD",
        namePlural: "New Taiwan dollars",
        locale: "en"
    },
    TZS: {
        symbol: "TSh",
        name: "Tanzanian Shilling",
        symbolNative: "TSh",
        decimalDigits: 2,
        rounding: 0,
        code: "TZS",
        namePlural: "Tanzanian shillings",
        locale: "en"
    },
    UAH: {
        symbol: "\u20B4",
        name: "Ukrainian Hryvnia",
        symbolNative: "\u20B4",
        decimalDigits: 2,
        rounding: 0,
        code: "UAH",
        namePlural: "Ukrainian hryvnias",
        locale: "en"
    },
    UGX: {
        symbol: "USh",
        name: "Ugandan Shilling",
        symbolNative: "USh",
        decimalDigits: 0,
        rounding: 0,
        code: "UGX",
        namePlural: "Ugandan shillings",
        locale: "en"
    },
    UYU: {
        symbol: "$U",
        name: "Uruguayan Peso",
        symbolNative: "$",
        decimalDigits: 2,
        rounding: 0,
        code: "UYU",
        namePlural: "Uruguayan pesos",
        locale: "en"
    },
    UZS: {
        symbol: "UZS",
        name: "Uzbekistan Som",
        symbolNative: "UZS",
        decimalDigits: 2,
        rounding: 0,
        code: "UZS",
        namePlural: "Uzbekistan som",
        locale: "en"
    },
    VEF: {
        symbol: "Bs.F.",
        name: "Venezuelan Bol\xEDvar",
        symbolNative: "Bs.F.",
        decimalDigits: 2,
        rounding: 0,
        code: "VEF",
        namePlural: "Venezuelan bol\xEDvars",
        locale: "en"
    },
    VND: {
        symbol: "\u20AB",
        name: "Vietnamese Dong",
        symbolNative: "\u20AB",
        decimalDigits: 0,
        rounding: 0,
        code: "VND",
        namePlural: "Vietnamese dong",
        locale: "en"
    },
    XAF: {
        symbol: "FCFA",
        name: "CFA Franc BEAC",
        symbolNative: "FCFA",
        decimalDigits: 0,
        rounding: 0,
        code: "XAF",
        namePlural: "CFA francs BEAC",
        locale: "en"
    },
    XOF: {
        symbol: "CFA",
        name: "CFA Franc BCEAO",
        symbolNative: "CFA",
        decimalDigits: 0,
        rounding: 0,
        code: "XOF",
        namePlural: "CFA francs BCEAO",
        locale: "en"
    },
    YER: {
        symbol: "YR",
        name: "Yemeni Rial",
        symbolNative: "\u0631.\u064A.\u200F",
        decimalDigits: 2,
        rounding: 0,
        code: "YER",
        namePlural: "Yemeni rials",
        locale: "en"
    },
    ZAR: {
        symbol: "R",
        name: "South African Rand",
        symbolNative: "R",
        decimalDigits: 2,
        rounding: 0,
        code: "ZAR",
        namePlural: "South African rand",
        locale: "en"
    },
    ZMK: {
        symbol: "ZK",
        name: "Zambian Kwacha",
        symbolNative: "ZK",
        decimalDigits: 0,
        rounding: 0,
        code: "ZMK",
        namePlural: "Zambian kwachas",
        locale: "en"
    }
};
var uo = "G-ZEPZ0NJT5F";

function jo(t) {
    let e = Number(t);
    return t === "None" || t === null || t === "" || isNaN(e) ? 0 : e
}
var H = (function(t) {
        return t[t.Ones = 1] = "Ones", t[t.Thousand = 1e3] = "Thousand", t[t.Million = 1e6] = "Million", t[t.Billion = 1e9] = "Billion", t[t.Trillion = 1e12] = "Trillion", t[t.Quadrillion = 1e15] = "Quadrillion", t
    })(H || {}),
    et = [{
        denominator: H.Ones,
        postfix: ""
    }, {
        denominator: H.Thousand,
        postfix: "k"
    }, {
        denominator: H.Million,
        postfix: "m"
    }, {
        denominator: H.Billion,
        postfix: "b"
    }, {
        denominator: H.Trillion,
        postfix: "t"
    }, {
        denominator: H.Quadrillion,
        postfix: "qua"
    }];

function ur(t) {
    let e = et[0];
    for (let r of et)
        if (t > 0 && t >= r.denominator || t < 0 && t <= -r.denominator) e = r;
        else break;
    return e
}

function en(t, e = 2) {
    if (t === 0) return t.toString();
    let r = ur(t);
    return (t / r.denominator).toFixed(e) + r.postfix
}

function tn(t) {
    if (t === "0") return 0;
    let e = parseFloat(t),
        r = t.replace(e.toString(), ""),
        a = et.find(o => o.postfix === r);
    return a ? e * a.denominator : e
}

function rn(t, e = 2) {
    return Math.round((t + Number.EPSILON) * 10 ** e) / 10 ** e
}
var dr = Math.pow(10, 8) * 24 * 60 * 60 * 1e3,
    on = -dr,
    ne = 6048e5,
    ft = 864e5,
    Z = 6e4,
    Q = 36e5,
    yt = 1e3;
var mr = 3600;
var ht = mr * 24,
    nn = ht * 7,
    pr = ht * 365.2425,
    fr = pr / 12,
    sn = fr * 3,
    tt = Symbol.for("constructDateFrom");

function f(t, e) {
    return typeof t == "function" ? t(e) : t && typeof t == "object" && tt in t ? t[tt](e) : t instanceof Date ? new t.constructor(e) : new Date(e)
}

function c(t, e) {
    return f(e || t, t)
}

function J(t, e, r) {
    let a = c(t, r ? .in);
    return isNaN(e) ? f(r ? .in || t, NaN) : (e && a.setDate(a.getDate() + e), a)
}
var yr = {};

function O() {
    return yr
}

function E(t, e) {
    let r = O(),
        a = e ? .weekStartsOn ? ? e ? .locale ? .options ? .weekStartsOn ? ? r.weekStartsOn ? ? r.locale ? .options ? .weekStartsOn ? ? 0,
        o = c(t, e ? .in),
        n = o.getDay(),
        i = (n < a ? 7 : 0) + n - a;
    return o.setDate(o.getDate() - i), o.setHours(0, 0, 0, 0), o
}

function A(t, e) {
    return E(t, Y(P({}, e), {
        weekStartsOn: 1
    }))
}

function ie(t, e) {
    let r = c(t, e ? .in),
        a = r.getFullYear(),
        o = f(r, 0);
    o.setFullYear(a + 1, 0, 4), o.setHours(0, 0, 0, 0);
    let n = A(o),
        i = f(r, 0);
    i.setFullYear(a, 0, 4), i.setHours(0, 0, 0, 0);
    let l = A(i);
    return r.getTime() >= n.getTime() ? a + 1 : r.getTime() >= l.getTime() ? a : a - 1
}

function W(t) {
    let e = c(t),
        r = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
    return r.setUTCFullYear(e.getFullYear()), +t - +r
}

function gt(t, ...e) {
    let r = f.bind(null, t || e.find(a => typeof a == "object"));
    return e.map(r)
}

function rt(t, e) {
    let r = c(t, e ? .in);
    return r.setHours(0, 0, 0, 0), r
}

function bt(t, e, r) {
    let [a, o] = gt(r ? .in, t, e), n = rt(a), i = rt(o), l = +n - W(n), w = +i - W(i);
    return Math.round((l - w) / ft)
}

function Dt(t, e) {
    let r = ie(t, e),
        a = f(e ? .in || t, 0);
    return a.setFullYear(r, 0, 4), a.setHours(0, 0, 0, 0), A(a)
}

function wt(t) {
    return t instanceof Date || typeof t == "object" && Object.prototype.toString.call(t) === "[object Date]"
}

function j(t) {
    return !(!wt(t) && typeof t != "number" || isNaN(+c(t)))
}

function xt(t, e) {
    let r = c(t, e ? .in);
    return r.setFullYear(r.getFullYear(), 0, 1), r.setHours(0, 0, 0, 0), r
}
var hr = {
        lessThanXSeconds: {
            one: "less than a second",
            other: "less than {{count}} seconds"
        },
        xSeconds: {
            one: "1 second",
            other: "{{count}} seconds"
        },
        halfAMinute: "half a minute",
        lessThanXMinutes: {
            one: "less than a minute",
            other: "less than {{count}} minutes"
        },
        xMinutes: {
            one: "1 minute",
            other: "{{count}} minutes"
        },
        aboutXHours: {
            one: "about 1 hour",
            other: "about {{count}} hours"
        },
        xHours: {
            one: "1 hour",
            other: "{{count}} hours"
        },
        xDays: {
            one: "1 day",
            other: "{{count}} days"
        },
        aboutXWeeks: {
            one: "about 1 week",
            other: "about {{count}} weeks"
        },
        xWeeks: {
            one: "1 week",
            other: "{{count}} weeks"
        },
        aboutXMonths: {
            one: "about 1 month",
            other: "about {{count}} months"
        },
        xMonths: {
            one: "1 month",
            other: "{{count}} months"
        },
        aboutXYears: {
            one: "about 1 year",
            other: "about {{count}} years"
        },
        xYears: {
            one: "1 year",
            other: "{{count}} years"
        },
        overXYears: {
            one: "over 1 year",
            other: "over {{count}} years"
        },
        almostXYears: {
            one: "almost 1 year",
            other: "almost {{count}} years"
        }
    },
    Tt = (t, e, r) => {
        let a, o = hr[t];
        return typeof o == "string" ? a = o : e === 1 ? a = o.one : a = o.other.replace("{{count}}", e.toString()), r ? .addSuffix ? r.comparison && r.comparison > 0 ? "in " + a : a + " ago" : a
    };

function se(t) {
    return (e = {}) => {
        let r = e.width ? String(e.width) : t.defaultWidth;
        return t.formats[r] || t.formats[t.defaultWidth]
    }
}
var gr = {
        full: "EEEE, MMMM do, y",
        long: "MMMM do, y",
        medium: "MMM d, y",
        short: "MM/dd/yyyy"
    },
    br = {
        full: "h:mm:ss a zzzz",
        long: "h:mm:ss a z",
        medium: "h:mm:ss a",
        short: "h:mm a"
    },
    Dr = {
        full: "{{date}} 'at' {{time}}",
        long: "{{date}} 'at' {{time}}",
        medium: "{{date}}, {{time}}",
        short: "{{date}}, {{time}}"
    },
    vt = {
        date: se({
            formats: gr,
            defaultWidth: "full"
        }),
        time: se({
            formats: br,
            defaultWidth: "full"
        }),
        dateTime: se({
            formats: Dr,
            defaultWidth: "full"
        })
    };
var wr = {
        lastWeek: "'last' eeee 'at' p",
        yesterday: "'yesterday at' p",
        today: "'today at' p",
        tomorrow: "'tomorrow at' p",
        nextWeek: "eeee 'at' p",
        other: "P"
    },
    Ct = (t, e, r, a) => wr[t];

function $(t) {
    return (e, r) => {
        let a = r ? .context ? String(r.context) : "standalone",
            o;
        if (a === "formatting" && t.formattingValues) {
            let i = t.defaultFormattingWidth || t.defaultWidth,
                l = r ? .width ? String(r.width) : i;
            o = t.formattingValues[l] || t.formattingValues[i]
        } else {
            let i = t.defaultWidth,
                l = r ? .width ? String(r.width) : t.defaultWidth;
            o = t.values[l] || t.values[i]
        }
        let n = t.argumentCallback ? t.argumentCallback(e) : e;
        return o[n]
    }
}
var xr = {
        narrow: ["B", "A"],
        abbreviated: ["BC", "AD"],
        wide: ["Before Christ", "Anno Domini"]
    },
    Tr = {
        narrow: ["1", "2", "3", "4"],
        abbreviated: ["Q1", "Q2", "Q3", "Q4"],
        wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
    },
    vr = {
        narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
        abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
    Cr = {
        narrow: ["S", "M", "T", "W", "T", "F", "S"],
        short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    Pr = {
        narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night"
        },
        wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night"
        }
    },
    Nr = {
        narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night"
        },
        wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night"
        }
    },
    Er = (t, e) => {
        let r = Number(t),
            a = r % 100;
        if (a > 20 || a < 10) switch (a % 10) {
            case 1:
                return r + "st";
            case 2:
                return r + "nd";
            case 3:
                return r + "rd"
        }
        return r + "th"
    },
    Pt = {
        ordinalNumber: Er,
        era: $({
            values: xr,
            defaultWidth: "wide"
        }),
        quarter: $({
            values: Tr,
            defaultWidth: "wide",
            argumentCallback: t => t - 1
        }),
        month: $({
            values: vr,
            defaultWidth: "wide"
        }),
        day: $({
            values: Cr,
            defaultWidth: "wide"
        }),
        dayPeriod: $({
            values: Pr,
            defaultWidth: "wide",
            formattingValues: Nr,
            defaultFormattingWidth: "wide"
        })
    };

function q(t) {
    return (e, r = {}) => {
        let a = r.width,
            o = a && t.matchPatterns[a] || t.matchPatterns[t.defaultMatchWidth],
            n = e.match(o);
        if (!n) return null;
        let i = n[0],
            l = a && t.parsePatterns[a] || t.parsePatterns[t.defaultParseWidth],
            w = Array.isArray(l) ? Sr(l, T => T.test(i)) : Or(l, T => T.test(i)),
            m;
        m = t.valueCallback ? t.valueCallback(w) : w, m = r.valueCallback ? r.valueCallback(m) : m;
        let D = e.slice(i.length);
        return {
            value: m,
            rest: D
        }
    }
}

function Or(t, e) {
    for (let r in t)
        if (Object.prototype.hasOwnProperty.call(t, r) && e(t[r])) return r
}

function Sr(t, e) {
    for (let r = 0; r < t.length; r++)
        if (e(t[r])) return r
}

function Nt(t) {
    return (e, r = {}) => {
        let a = e.match(t.matchPattern);
        if (!a) return null;
        let o = a[0],
            n = e.match(t.parsePattern);
        if (!n) return null;
        let i = t.valueCallback ? t.valueCallback(n[0]) : n[0];
        i = r.valueCallback ? r.valueCallback(i) : i;
        let l = e.slice(o.length);
        return {
            value: i,
            rest: l
        }
    }
}
var Mr = /^(\d+)(th|st|nd|rd)?/i,
    kr = /\d+/i,
    Ar = {
        narrow: /^(b|a)/i,
        abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
        wide: /^(before christ|before common era|anno domini|common era)/i
    },
    Fr = {
        any: [/^b/i, /^(a|c)/i]
    },
    Rr = {
        narrow: /^[1234]/i,
        abbreviated: /^q[1234]/i,
        wide: /^[1234](th|st|nd|rd)? quarter/i
    },
    Ir = {
        any: [/1/i, /2/i, /3/i, /4/i]
    },
    Yr = {
        narrow: /^[jfmasond]/i,
        abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
        wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
    },
    Lr = {
        narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
        any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
    },
    Br = {
        narrow: /^[smtwf]/i,
        short: /^(su|mo|tu|we|th|fr|sa)/i,
        abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
        wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
    },
    Hr = {
        narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
        any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
    },
    Wr = {
        narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
        any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
    },
    _r = {
        any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^mi/i,
            noon: /^no/i,
            morning: /morning/i,
            afternoon: /afternoon/i,
            evening: /evening/i,
            night: /night/i
        }
    },
    Et = {
        ordinalNumber: Nt({
            matchPattern: Mr,
            parsePattern: kr,
            valueCallback: t => parseInt(t, 10)
        }),
        era: q({
            matchPatterns: Ar,
            defaultMatchWidth: "wide",
            parsePatterns: Fr,
            defaultParseWidth: "any"
        }),
        quarter: q({
            matchPatterns: Rr,
            defaultMatchWidth: "wide",
            parsePatterns: Ir,
            defaultParseWidth: "any",
            valueCallback: t => t + 1
        }),
        month: q({
            matchPatterns: Yr,
            defaultMatchWidth: "wide",
            parsePatterns: Lr,
            defaultParseWidth: "any"
        }),
        day: q({
            matchPatterns: Br,
            defaultMatchWidth: "wide",
            parsePatterns: Hr,
            defaultParseWidth: "any"
        }),
        dayPeriod: q({
            matchPatterns: Wr,
            defaultMatchWidth: "any",
            parsePatterns: _r,
            defaultParseWidth: "any"
        })
    };
var ee = {
    code: "en-US",
    formatDistance: Tt,
    formatLong: vt,
    formatRelative: Ct,
    localize: Pt,
    match: Et,
    options: {
        weekStartsOn: 0,
        firstWeekContainsDate: 1
    }
};

function Ot(t, e) {
    let r = c(t, e ? .in);
    return bt(r, xt(r)) + 1
}

function le(t, e) {
    let r = c(t, e ? .in),
        a = +A(r) - +Dt(r);
    return Math.round(a / ne) + 1
}

function U(t, e) {
    let r = c(t, e ? .in),
        a = r.getFullYear(),
        o = O(),
        n = e ? .firstWeekContainsDate ? ? e ? .locale ? .options ? .firstWeekContainsDate ? ? o.firstWeekContainsDate ? ? o.locale ? .options ? .firstWeekContainsDate ? ? 1,
        i = f(e ? .in || t, 0);
    i.setFullYear(a + 1, 0, n), i.setHours(0, 0, 0, 0);
    let l = E(i, e),
        w = f(e ? .in || t, 0);
    w.setFullYear(a, 0, n), w.setHours(0, 0, 0, 0);
    let m = E(w, e);
    return +r >= +l ? a + 1 : +r >= +m ? a : a - 1
}

function St(t, e) {
    let r = O(),
        a = e ? .firstWeekContainsDate ? ? e ? .locale ? .options ? .firstWeekContainsDate ? ? r.firstWeekContainsDate ? ? r.locale ? .options ? .firstWeekContainsDate ? ? 1,
        o = U(t, e),
        n = f(e ? .in || t, 0);
    return n.setFullYear(o, 0, a), n.setHours(0, 0, 0, 0), E(n, e)
}

function ce(t, e) {
    let r = c(t, e ? .in),
        a = +E(r, e) - +St(r, e);
    return Math.round(a / ne) + 1
}

function p(t, e) {
    let r = t < 0 ? "-" : "",
        a = Math.abs(t).toString().padStart(e, "0");
    return r + a
}
var R = {
    y(t, e) {
        let r = t.getFullYear(),
            a = r > 0 ? r : 1 - r;
        return p(e === "yy" ? a % 100 : a, e.length)
    },
    M(t, e) {
        let r = t.getMonth();
        return e === "M" ? String(r + 1) : p(r + 1, 2)
    },
    d(t, e) {
        return p(t.getDate(), e.length)
    },
    a(t, e) {
        let r = t.getHours() / 12 >= 1 ? "pm" : "am";
        switch (e) {
            case "a":
            case "aa":
                return r.toUpperCase();
            case "aaa":
                return r;
            case "aaaaa":
                return r[0];
            case "aaaa":
            default:
                return r === "am" ? "a.m." : "p.m."
        }
    },
    h(t, e) {
        return p(t.getHours() % 12 || 12, e.length)
    },
    H(t, e) {
        return p(t.getHours(), e.length)
    },
    m(t, e) {
        return p(t.getMinutes(), e.length)
    },
    s(t, e) {
        return p(t.getSeconds(), e.length)
    },
    S(t, e) {
        let r = e.length,
            a = t.getMilliseconds(),
            o = Math.trunc(a * Math.pow(10, r - 3));
        return p(o, e.length)
    }
};
var G = {
        am: "am",
        pm: "pm",
        midnight: "midnight",
        noon: "noon",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night"
    },
    at = {
        G: function(t, e, r) {
            let a = t.getFullYear() > 0 ? 1 : 0;
            switch (e) {
                case "G":
                case "GG":
                case "GGG":
                    return r.era(a, {
                        width: "abbreviated"
                    });
                case "GGGGG":
                    return r.era(a, {
                        width: "narrow"
                    });
                case "GGGG":
                default:
                    return r.era(a, {
                        width: "wide"
                    })
            }
        },
        y: function(t, e, r) {
            if (e === "yo") {
                let a = t.getFullYear(),
                    o = a > 0 ? a : 1 - a;
                return r.ordinalNumber(o, {
                    unit: "year"
                })
            }
            return R.y(t, e)
        },
        Y: function(t, e, r, a) {
            let o = U(t, a),
                n = o > 0 ? o : 1 - o;
            if (e === "YY") {
                let i = n % 100;
                return p(i, 2)
            }
            return e === "Yo" ? r.ordinalNumber(n, {
                unit: "year"
            }) : p(n, e.length)
        },
        R: function(t, e) {
            let r = ie(t);
            return p(r, e.length)
        },
        u: function(t, e) {
            let r = t.getFullYear();
            return p(r, e.length)
        },
        Q: function(t, e, r) {
            let a = Math.ceil((t.getMonth() + 1) / 3);
            switch (e) {
                case "Q":
                    return String(a);
                case "QQ":
                    return p(a, 2);
                case "Qo":
                    return r.ordinalNumber(a, {
                        unit: "quarter"
                    });
                case "QQQ":
                    return r.quarter(a, {
                        width: "abbreviated",
                        context: "formatting"
                    });
                case "QQQQQ":
                    return r.quarter(a, {
                        width: "narrow",
                        context: "formatting"
                    });
                case "QQQQ":
                default:
                    return r.quarter(a, {
                        width: "wide",
                        context: "formatting"
                    })
            }
        },
        q: function(t, e, r) {
            let a = Math.ceil((t.getMonth() + 1) / 3);
            switch (e) {
                case "q":
                    return String(a);
                case "qq":
                    return p(a, 2);
                case "qo":
                    return r.ordinalNumber(a, {
                        unit: "quarter"
                    });
                case "qqq":
                    return r.quarter(a, {
                        width: "abbreviated",
                        context: "standalone"
                    });
                case "qqqqq":
                    return r.quarter(a, {
                        width: "narrow",
                        context: "standalone"
                    });
                case "qqqq":
                default:
                    return r.quarter(a, {
                        width: "wide",
                        context: "standalone"
                    })
            }
        },
        M: function(t, e, r) {
            let a = t.getMonth();
            switch (e) {
                case "M":
                case "MM":
                    return R.M(t, e);
                case "Mo":
                    return r.ordinalNumber(a + 1, {
                        unit: "month"
                    });
                case "MMM":
                    return r.month(a, {
                        width: "abbreviated",
                        context: "formatting"
                    });
                case "MMMMM":
                    return r.month(a, {
                        width: "narrow",
                        context: "formatting"
                    });
                case "MMMM":
                default:
                    return r.month(a, {
                        width: "wide",
                        context: "formatting"
                    })
            }
        },
        L: function(t, e, r) {
            let a = t.getMonth();
            switch (e) {
                case "L":
                    return String(a + 1);
                case "LL":
                    return p(a + 1, 2);
                case "Lo":
                    return r.ordinalNumber(a + 1, {
                        unit: "month"
                    });
                case "LLL":
                    return r.month(a, {
                        width: "abbreviated",
                        context: "standalone"
                    });
                case "LLLLL":
                    return r.month(a, {
                        width: "narrow",
                        context: "standalone"
                    });
                case "LLLL":
                default:
                    return r.month(a, {
                        width: "wide",
                        context: "standalone"
                    })
            }
        },
        w: function(t, e, r, a) {
            let o = ce(t, a);
            return e === "wo" ? r.ordinalNumber(o, {
                unit: "week"
            }) : p(o, e.length)
        },
        I: function(t, e, r) {
            let a = le(t);
            return e === "Io" ? r.ordinalNumber(a, {
                unit: "week"
            }) : p(a, e.length)
        },
        d: function(t, e, r) {
            return e === "do" ? r.ordinalNumber(t.getDate(), {
                unit: "date"
            }) : R.d(t, e)
        },
        D: function(t, e, r) {
            let a = Ot(t);
            return e === "Do" ? r.ordinalNumber(a, {
                unit: "dayOfYear"
            }) : p(a, e.length)
        },
        E: function(t, e, r) {
            let a = t.getDay();
            switch (e) {
                case "E":
                case "EE":
                case "EEE":
                    return r.day(a, {
                        width: "abbreviated",
                        context: "formatting"
                    });
                case "EEEEE":
                    return r.day(a, {
                        width: "narrow",
                        context: "formatting"
                    });
                case "EEEEEE":
                    return r.day(a, {
                        width: "short",
                        context: "formatting"
                    });
                case "EEEE":
                default:
                    return r.day(a, {
                        width: "wide",
                        context: "formatting"
                    })
            }
        },
        e: function(t, e, r, a) {
            let o = t.getDay(),
                n = (o - a.weekStartsOn + 8) % 7 || 7;
            switch (e) {
                case "e":
                    return String(n);
                case "ee":
                    return p(n, 2);
                case "eo":
                    return r.ordinalNumber(n, {
                        unit: "day"
                    });
                case "eee":
                    return r.day(o, {
                        width: "abbreviated",
                        context: "formatting"
                    });
                case "eeeee":
                    return r.day(o, {
                        width: "narrow",
                        context: "formatting"
                    });
                case "eeeeee":
                    return r.day(o, {
                        width: "short",
                        context: "formatting"
                    });
                case "eeee":
                default:
                    return r.day(o, {
                        width: "wide",
                        context: "formatting"
                    })
            }
        },
        c: function(t, e, r, a) {
            let o = t.getDay(),
                n = (o - a.weekStartsOn + 8) % 7 || 7;
            switch (e) {
                case "c":
                    return String(n);
                case "cc":
                    return p(n, e.length);
                case "co":
                    return r.ordinalNumber(n, {
                        unit: "day"
                    });
                case "ccc":
                    return r.day(o, {
                        width: "abbreviated",
                        context: "standalone"
                    });
                case "ccccc":
                    return r.day(o, {
                        width: "narrow",
                        context: "standalone"
                    });
                case "cccccc":
                    return r.day(o, {
                        width: "short",
                        context: "standalone"
                    });
                case "cccc":
                default:
                    return r.day(o, {
                        width: "wide",
                        context: "standalone"
                    })
            }
        },
        i: function(t, e, r) {
            let a = t.getDay(),
                o = a === 0 ? 7 : a;
            switch (e) {
                case "i":
                    return String(o);
                case "ii":
                    return p(o, e.length);
                case "io":
                    return r.ordinalNumber(o, {
                        unit: "day"
                    });
                case "iii":
                    return r.day(a, {
                        width: "abbreviated",
                        context: "formatting"
                    });
                case "iiiii":
                    return r.day(a, {
                        width: "narrow",
                        context: "formatting"
                    });
                case "iiiiii":
                    return r.day(a, {
                        width: "short",
                        context: "formatting"
                    });
                case "iiii":
                default:
                    return r.day(a, {
                        width: "wide",
                        context: "formatting"
                    })
            }
        },
        a: function(t, e, r) {
            let o = t.getHours() / 12 >= 1 ? "pm" : "am";
            switch (e) {
                case "a":
                case "aa":
                    return r.dayPeriod(o, {
                        width: "abbreviated",
                        context: "formatting"
                    });
                case "aaa":
                    return r.dayPeriod(o, {
                        width: "abbreviated",
                        context: "formatting"
                    }).toLowerCase();
                case "aaaaa":
                    return r.dayPeriod(o, {
                        width: "narrow",
                        context: "formatting"
                    });
                case "aaaa":
                default:
                    return r.dayPeriod(o, {
                        width: "wide",
                        context: "formatting"
                    })
            }
        },
        b: function(t, e, r) {
            let a = t.getHours(),
                o;
            switch (a === 12 ? o = G.noon : a === 0 ? o = G.midnight : o = a / 12 >= 1 ? "pm" : "am", e) {
                case "b":
                case "bb":
                    return r.dayPeriod(o, {
                        width: "abbreviated",
                        context: "formatting"
                    });
                case "bbb":
                    return r.dayPeriod(o, {
                        width: "abbreviated",
                        context: "formatting"
                    }).toLowerCase();
                case "bbbbb":
                    return r.dayPeriod(o, {
                        width: "narrow",
                        context: "formatting"
                    });
                case "bbbb":
                default:
                    return r.dayPeriod(o, {
                        width: "wide",
                        context: "formatting"
                    })
            }
        },
        B: function(t, e, r) {
            let a = t.getHours(),
                o;
            switch (a >= 17 ? o = G.evening : a >= 12 ? o = G.afternoon : a >= 4 ? o = G.morning : o = G.night, e) {
                case "B":
                case "BB":
                case "BBB":
                    return r.dayPeriod(o, {
                        width: "abbreviated",
                        context: "formatting"
                    });
                case "BBBBB":
                    return r.dayPeriod(o, {
                        width: "narrow",
                        context: "formatting"
                    });
                case "BBBB":
                default:
                    return r.dayPeriod(o, {
                        width: "wide",
                        context: "formatting"
                    })
            }
        },
        h: function(t, e, r) {
            if (e === "ho") {
                let a = t.getHours() % 12;
                return a === 0 && (a = 12), r.ordinalNumber(a, {
                    unit: "hour"
                })
            }
            return R.h(t, e)
        },
        H: function(t, e, r) {
            return e === "Ho" ? r.ordinalNumber(t.getHours(), {
                unit: "hour"
            }) : R.H(t, e)
        },
        K: function(t, e, r) {
            let a = t.getHours() % 12;
            return e === "Ko" ? r.ordinalNumber(a, {
                unit: "hour"
            }) : p(a, e.length)
        },
        k: function(t, e, r) {
            let a = t.getHours();
            return a === 0 && (a = 24), e === "ko" ? r.ordinalNumber(a, {
                unit: "hour"
            }) : p(a, e.length)
        },
        m: function(t, e, r) {
            return e === "mo" ? r.ordinalNumber(t.getMinutes(), {
                unit: "minute"
            }) : R.m(t, e)
        },
        s: function(t, e, r) {
            return e === "so" ? r.ordinalNumber(t.getSeconds(), {
                unit: "second"
            }) : R.s(t, e)
        },
        S: function(t, e) {
            return R.S(t, e)
        },
        X: function(t, e, r) {
            let a = t.getTimezoneOffset();
            if (a === 0) return "Z";
            switch (e) {
                case "X":
                    return kt(a);
                case "XXXX":
                case "XX":
                    return _(a);
                case "XXXXX":
                case "XXX":
                default:
                    return _(a, ":")
            }
        },
        x: function(t, e, r) {
            let a = t.getTimezoneOffset();
            switch (e) {
                case "x":
                    return kt(a);
                case "xxxx":
                case "xx":
                    return _(a);
                case "xxxxx":
                case "xxx":
                default:
                    return _(a, ":")
            }
        },
        O: function(t, e, r) {
            let a = t.getTimezoneOffset();
            switch (e) {
                case "O":
                case "OO":
                case "OOO":
                    return "GMT" + Mt(a, ":");
                case "OOOO":
                default:
                    return "GMT" + _(a, ":")
            }
        },
        z: function(t, e, r) {
            let a = t.getTimezoneOffset();
            switch (e) {
                case "z":
                case "zz":
                case "zzz":
                    return "GMT" + Mt(a, ":");
                case "zzzz":
                default:
                    return "GMT" + _(a, ":")
            }
        },
        t: function(t, e, r) {
            let a = Math.trunc(+t / 1e3);
            return p(a, e.length)
        },
        T: function(t, e, r) {
            return p(+t, e.length)
        }
    };

function Mt(t, e = "") {
    let r = t > 0 ? "-" : "+",
        a = Math.abs(t),
        o = Math.trunc(a / 60),
        n = a % 60;
    return n === 0 ? r + String(o) : r + String(o) + e + p(n, 2)
}

function kt(t, e) {
    return t % 60 === 0 ? (t > 0 ? "-" : "+") + p(Math.abs(t) / 60, 2) : _(t, e)
}

function _(t, e = "") {
    let r = t > 0 ? "-" : "+",
        a = Math.abs(t),
        o = p(Math.trunc(a / 60), 2),
        n = p(a % 60, 2);
    return r + o + e + n
}
var At = (t, e) => {
        switch (t) {
            case "P":
                return e.date({
                    width: "short"
                });
            case "PP":
                return e.date({
                    width: "medium"
                });
            case "PPP":
                return e.date({
                    width: "long"
                });
            case "PPPP":
            default:
                return e.date({
                    width: "full"
                })
        }
    },
    Ft = (t, e) => {
        switch (t) {
            case "p":
                return e.time({
                    width: "short"
                });
            case "pp":
                return e.time({
                    width: "medium"
                });
            case "ppp":
                return e.time({
                    width: "long"
                });
            case "pppp":
            default:
                return e.time({
                    width: "full"
                })
        }
    },
    $r = (t, e) => {
        let r = t.match(/(P+)(p+)?/) || [],
            a = r[1],
            o = r[2];
        if (!o) return At(t, e);
        let n;
        switch (a) {
            case "P":
                n = e.dateTime({
                    width: "short"
                });
                break;
            case "PP":
                n = e.dateTime({
                    width: "medium"
                });
                break;
            case "PPP":
                n = e.dateTime({
                    width: "long"
                });
                break;
            case "PPPP":
            default:
                n = e.dateTime({
                    width: "full"
                });
                break
        }
        return n.replace("{{date}}", At(a, e)).replace("{{time}}", Ft(o, e))
    },
    te = {
        p: Ft,
        P: $r
    };
var qr = /^D+$/,
    Ur = /^Y+$/,
    Gr = ["D", "DD", "YY", "YYYY"];

function ue(t) {
    return qr.test(t)
}

function de(t) {
    return Ur.test(t)
}

function re(t, e, r) {
    let a = Kr(t, e, r);
    if (console.warn(a), Gr.includes(t)) throw new RangeError(a)
}

function Kr(t, e, r) {
    let a = t[0] === "Y" ? "years" : "days of the month";
    return `Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${a} to the input \`${r}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`
}
var zr = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
    Xr = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
    Vr = /^'([^]*?)'?$/,
    Zr = /''/g,
    Qr = /[a-zA-Z]/;

function ns(t, e, r) {
    let a = O(),
        o = r ? .locale ? ? a.locale ? ? ee,
        n = r ? .firstWeekContainsDate ? ? r ? .locale ? .options ? .firstWeekContainsDate ? ? a.firstWeekContainsDate ? ? a.locale ? .options ? .firstWeekContainsDate ? ? 1,
        i = r ? .weekStartsOn ? ? r ? .locale ? .options ? .weekStartsOn ? ? a.weekStartsOn ? ? a.locale ? .options ? .weekStartsOn ? ? 0,
        l = c(t, r ? .in);
    if (!j(l)) throw new RangeError("Invalid time value");
    let w = e.match(Xr).map(D => {
        let T = D[0];
        if (T === "p" || T === "P") {
            let F = te[T];
            return F(D, o.formatLong)
        }
        return D
    }).join("").match(zr).map(D => {
        if (D === "''") return {
            isToken: !1,
            value: "'"
        };
        let T = D[0];
        if (T === "'") return {
            isToken: !1,
            value: Jr(D)
        };
        if (at[T]) return {
            isToken: !0,
            value: D
        };
        if (T.match(Qr)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + T + "`");
        return {
            isToken: !1,
            value: D
        }
    });
    o.localize.preprocessor && (w = o.localize.preprocessor(l, w));
    let m = {
        firstWeekContainsDate: n,
        weekStartsOn: i,
        locale: o
    };
    return w.map(D => {
        if (!D.isToken) return D.value;
        let T = D.value;
        (!r ? .useAdditionalWeekYearTokens && de(T) || !r ? .useAdditionalDayOfYearTokens && ue(T)) && re(T, e, String(t));
        let F = at[T[0]];
        return F(l, T, o.localize, m)
    }).join("")
}

function Jr(t) {
    let e = t.match(Vr);
    return e ? e[1].replace(Zr, "'") : t
}

function Rt(t, e) {
    let r = c(t, e ? .in);
    if (isNaN(+r)) throw new RangeError("Invalid time value");
    let a = e ? .format ? ? "extended",
        o = e ? .representation ? ? "complete",
        n = "",
        i = "",
        l = a === "extended" ? "-" : "",
        w = a === "extended" ? ":" : "";
    if (o !== "time") {
        let m = p(r.getDate(), 2),
            D = p(r.getMonth() + 1, 2);
        n = `${p(r.getFullYear(),4)}${l}${D}${l}${m}`
    }
    if (o !== "date") {
        let m = r.getTimezoneOffset();
        if (m !== 0) {
            let V = Math.abs(m),
                h = p(Math.trunc(V / 60), 2),
                C = p(V % 60, 2);
            i = `${m<0?"+":"-"}${h}:${C}`
        } else i = "Z";
        let D = p(r.getHours(), 2),
            T = p(r.getMinutes(), 2),
            F = p(r.getSeconds(), 2),
            Je = n === "" ? "" : "T",
            I = [D, T, F].join(w);
        n = `${n}${Je}${I}${i}`
    }
    return n
}

function It() {
    return Object.assign({}, O())
}

function Yt(t, e) {
    let r = c(t, e ? .in).getDay();
    return r === 0 ? 7 : r
}

function jr(t, e) {
    return +c(t) > +c(e)
}

function ea(t, e) {
    return +c(t) < +c(e)
}

function Lt(t, e) {
    let r = ta(e) ? new e(0) : f(e, 0);
    return r.setFullYear(t.getFullYear(), t.getMonth(), t.getDate()), r.setHours(t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()), r
}

function ta(t) {
    return typeof t == "function" && t.prototype ? .constructor === t
}
var ra = 10,
    me = class {
        subPriority = 0;
        validate(e, r) {
            return !0
        }
    },
    pe = class extends me {
        constructor(e, r, a, o, n) {
            super(), this.value = e, this.validateValue = r, this.setValue = a, this.priority = o, n && (this.subPriority = n)
        }
        validate(e, r) {
            return this.validateValue(e, this.value, r)
        }
        set(e, r, a) {
            return this.setValue(e, r, this.value, a)
        }
    },
    fe = class extends me {
        priority = ra;
        subPriority = -1;
        constructor(e, r) {
            super(), this.context = e || (a => f(r, a))
        }
        set(e, r) {
            return r.timestampIsSet ? e : f(e, Lt(e, this.context))
        }
    };
var s = class {
    run(e, r, a, o) {
        let n = this.parse(e, r, a, o);
        return n ? {
            setter: new pe(n.value, this.validate, this.set, this.priority, this.subPriority),
            rest: n.rest
        } : null
    }
    validate(e, r, a) {
        return !0
    }
};
var ye = class extends s {
    priority = 140;
    parse(e, r, a) {
        switch (r) {
            case "G":
            case "GG":
            case "GGG":
                return a.era(e, {
                    width: "abbreviated"
                }) || a.era(e, {
                    width: "narrow"
                });
            case "GGGGG":
                return a.era(e, {
                    width: "narrow"
                });
            case "GGGG":
            default:
                return a.era(e, {
                    width: "wide"
                }) || a.era(e, {
                    width: "abbreviated"
                }) || a.era(e, {
                    width: "narrow"
                })
        }
    }
    set(e, r, a) {
        return r.era = a, e.setFullYear(a, 0, 1), e.setHours(0, 0, 0, 0), e
    }
    incompatibleTokens = ["R", "u", "t", "T"]
};
var g = {
        month: /^(1[0-2]|0?\d)/,
        date: /^(3[0-1]|[0-2]?\d)/,
        dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
        week: /^(5[0-3]|[0-4]?\d)/,
        hour23h: /^(2[0-3]|[0-1]?\d)/,
        hour24h: /^(2[0-4]|[0-1]?\d)/,
        hour11h: /^(1[0-1]|0?\d)/,
        hour12h: /^(1[0-2]|0?\d)/,
        minute: /^[0-5]?\d/,
        second: /^[0-5]?\d/,
        singleDigit: /^\d/,
        twoDigits: /^\d{1,2}/,
        threeDigits: /^\d{1,3}/,
        fourDigits: /^\d{1,4}/,
        anyDigitsSigned: /^-?\d+/,
        singleDigitSigned: /^-?\d/,
        twoDigitsSigned: /^-?\d{1,2}/,
        threeDigitsSigned: /^-?\d{1,3}/,
        fourDigitsSigned: /^-?\d{1,4}/
    },
    S = {
        basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
        basic: /^([+-])(\d{2})(\d{2})|Z/,
        basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
        extended: /^([+-])(\d{2}):(\d{2})|Z/,
        extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
    };

function x(t, e) {
    return t && {
        value: e(t.value),
        rest: t.rest
    }
}

function y(t, e) {
    let r = e.match(t);
    return r ? {
        value: parseInt(r[0], 10),
        rest: e.slice(r[0].length)
    } : null
}

function M(t, e) {
    let r = e.match(t);
    if (!r) return null;
    if (r[0] === "Z") return {
        value: 0,
        rest: e.slice(1)
    };
    let a = r[1] === "+" ? 1 : -1,
        o = r[2] ? parseInt(r[2], 10) : 0,
        n = r[3] ? parseInt(r[3], 10) : 0,
        i = r[5] ? parseInt(r[5], 10) : 0;
    return {
        value: a * (o * Q + n * Z + i * yt),
        rest: e.slice(r[0].length)
    }
}

function he(t) {
    return y(g.anyDigitsSigned, t)
}

function d(t, e) {
    switch (t) {
        case 1:
            return y(g.singleDigit, e);
        case 2:
            return y(g.twoDigits, e);
        case 3:
            return y(g.threeDigits, e);
        case 4:
            return y(g.fourDigits, e);
        default:
            return y(new RegExp("^\\d{1," + t + "}"), e)
    }
}

function K(t, e) {
    switch (t) {
        case 1:
            return y(g.singleDigitSigned, e);
        case 2:
            return y(g.twoDigitsSigned, e);
        case 3:
            return y(g.threeDigitsSigned, e);
        case 4:
            return y(g.fourDigitsSigned, e);
        default:
            return y(new RegExp("^-?\\d{1," + t + "}"), e)
    }
}

function z(t) {
    switch (t) {
        case "morning":
            return 4;
        case "evening":
            return 17;
        case "pm":
        case "noon":
        case "afternoon":
            return 12;
        case "am":
        case "midnight":
        case "night":
        default:
            return 0
    }
}

function ge(t, e) {
    let r = e > 0,
        a = r ? e : 1 - e,
        o;
    if (a <= 50) o = t || 100;
    else {
        let n = a + 50,
            i = Math.trunc(n / 100) * 100,
            l = t >= n % 100;
        o = t + i - (l ? 100 : 0)
    }
    return r ? o : 1 - o
}

function be(t) {
    return t % 400 === 0 || t % 4 === 0 && t % 100 !== 0
}
var De = class extends s {
    priority = 130;
    incompatibleTokens = ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"];
    parse(e, r, a) {
        let o = n => ({
            year: n,
            isTwoDigitYear: r === "yy"
        });
        switch (r) {
            case "y":
                return x(d(4, e), o);
            case "yo":
                return x(a.ordinalNumber(e, {
                    unit: "year"
                }), o);
            default:
                return x(d(r.length, e), o)
        }
    }
    validate(e, r) {
        return r.isTwoDigitYear || r.year > 0
    }
    set(e, r, a) {
        let o = e.getFullYear();
        if (a.isTwoDigitYear) {
            let i = ge(a.year, o);
            return e.setFullYear(i, 0, 1), e.setHours(0, 0, 0, 0), e
        }
        let n = !("era" in r) || r.era === 1 ? a.year : 1 - a.year;
        return e.setFullYear(n, 0, 1), e.setHours(0, 0, 0, 0), e
    }
};
var we = class extends s {
    priority = 130;
    parse(e, r, a) {
        let o = n => ({
            year: n,
            isTwoDigitYear: r === "YY"
        });
        switch (r) {
            case "Y":
                return x(d(4, e), o);
            case "Yo":
                return x(a.ordinalNumber(e, {
                    unit: "year"
                }), o);
            default:
                return x(d(r.length, e), o)
        }
    }
    validate(e, r) {
        return r.isTwoDigitYear || r.year > 0
    }
    set(e, r, a, o) {
        let n = U(e, o);
        if (a.isTwoDigitYear) {
            let l = ge(a.year, n);
            return e.setFullYear(l, 0, o.firstWeekContainsDate), e.setHours(0, 0, 0, 0), E(e, o)
        }
        let i = !("era" in r) || r.era === 1 ? a.year : 1 - a.year;
        return e.setFullYear(i, 0, o.firstWeekContainsDate), e.setHours(0, 0, 0, 0), E(e, o)
    }
    incompatibleTokens = ["y", "R", "u", "Q", "q", "M", "L", "I", "d", "D", "i", "t", "T"]
};
var xe = class extends s {
    priority = 130;
    parse(e, r) {
        return r === "R" ? K(4, e) : K(r.length, e)
    }
    set(e, r, a) {
        let o = f(e, 0);
        return o.setFullYear(a, 0, 4), o.setHours(0, 0, 0, 0), A(o)
    }
    incompatibleTokens = ["G", "y", "Y", "u", "Q", "q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]
};
var Te = class extends s {
    priority = 130;
    parse(e, r) {
        return r === "u" ? K(4, e) : K(r.length, e)
    }
    set(e, r, a) {
        return e.setFullYear(a, 0, 1), e.setHours(0, 0, 0, 0), e
    }
    incompatibleTokens = ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]
};
var ve = class extends s {
    priority = 120;
    parse(e, r, a) {
        switch (r) {
            case "Q":
            case "QQ":
                return d(r.length, e);
            case "Qo":
                return a.ordinalNumber(e, {
                    unit: "quarter"
                });
            case "QQQ":
                return a.quarter(e, {
                    width: "abbreviated",
                    context: "formatting"
                }) || a.quarter(e, {
                    width: "narrow",
                    context: "formatting"
                });
            case "QQQQQ":
                return a.quarter(e, {
                    width: "narrow",
                    context: "formatting"
                });
            case "QQQQ":
            default:
                return a.quarter(e, {
                    width: "wide",
                    context: "formatting"
                }) || a.quarter(e, {
                    width: "abbreviated",
                    context: "formatting"
                }) || a.quarter(e, {
                    width: "narrow",
                    context: "formatting"
                })
        }
    }
    validate(e, r) {
        return r >= 1 && r <= 4
    }
    set(e, r, a) {
        return e.setMonth((a - 1) * 3, 1), e.setHours(0, 0, 0, 0), e
    }
    incompatibleTokens = ["Y", "R", "q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]
};
var Ce = class extends s {
    priority = 120;
    parse(e, r, a) {
        switch (r) {
            case "q":
            case "qq":
                return d(r.length, e);
            case "qo":
                return a.ordinalNumber(e, {
                    unit: "quarter"
                });
            case "qqq":
                return a.quarter(e, {
                    width: "abbreviated",
                    context: "standalone"
                }) || a.quarter(e, {
                    width: "narrow",
                    context: "standalone"
                });
            case "qqqqq":
                return a.quarter(e, {
                    width: "narrow",
                    context: "standalone"
                });
            case "qqqq":
            default:
                return a.quarter(e, {
                    width: "wide",
                    context: "standalone"
                }) || a.quarter(e, {
                    width: "abbreviated",
                    context: "standalone"
                }) || a.quarter(e, {
                    width: "narrow",
                    context: "standalone"
                })
        }
    }
    validate(e, r) {
        return r >= 1 && r <= 4
    }
    set(e, r, a) {
        return e.setMonth((a - 1) * 3, 1), e.setHours(0, 0, 0, 0), e
    }
    incompatibleTokens = ["Y", "R", "Q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]
};
var Pe = class extends s {
    incompatibleTokens = ["Y", "R", "q", "Q", "L", "w", "I", "D", "i", "e", "c", "t", "T"];
    priority = 110;
    parse(e, r, a) {
        let o = n => n - 1;
        switch (r) {
            case "M":
                return x(y(g.month, e), o);
            case "MM":
                return x(d(2, e), o);
            case "Mo":
                return x(a.ordinalNumber(e, {
                    unit: "month"
                }), o);
            case "MMM":
                return a.month(e, {
                    width: "abbreviated",
                    context: "formatting"
                }) || a.month(e, {
                    width: "narrow",
                    context: "formatting"
                });
            case "MMMMM":
                return a.month(e, {
                    width: "narrow",
                    context: "formatting"
                });
            case "MMMM":
            default:
                return a.month(e, {
                    width: "wide",
                    context: "formatting"
                }) || a.month(e, {
                    width: "abbreviated",
                    context: "formatting"
                }) || a.month(e, {
                    width: "narrow",
                    context: "formatting"
                })
        }
    }
    validate(e, r) {
        return r >= 0 && r <= 11
    }
    set(e, r, a) {
        return e.setMonth(a, 1), e.setHours(0, 0, 0, 0), e
    }
};
var Ne = class extends s {
    priority = 110;
    parse(e, r, a) {
        let o = n => n - 1;
        switch (r) {
            case "L":
                return x(y(g.month, e), o);
            case "LL":
                return x(d(2, e), o);
            case "Lo":
                return x(a.ordinalNumber(e, {
                    unit: "month"
                }), o);
            case "LLL":
                return a.month(e, {
                    width: "abbreviated",
                    context: "standalone"
                }) || a.month(e, {
                    width: "narrow",
                    context: "standalone"
                });
            case "LLLLL":
                return a.month(e, {
                    width: "narrow",
                    context: "standalone"
                });
            case "LLLL":
            default:
                return a.month(e, {
                    width: "wide",
                    context: "standalone"
                }) || a.month(e, {
                    width: "abbreviated",
                    context: "standalone"
                }) || a.month(e, {
                    width: "narrow",
                    context: "standalone"
                })
        }
    }
    validate(e, r) {
        return r >= 0 && r <= 11
    }
    set(e, r, a) {
        return e.setMonth(a, 1), e.setHours(0, 0, 0, 0), e
    }
    incompatibleTokens = ["Y", "R", "q", "Q", "M", "w", "I", "D", "i", "e", "c", "t", "T"]
};

function Bt(t, e, r) {
    let a = c(t, r ? .in),
        o = ce(a, r) - e;
    return a.setDate(a.getDate() - o * 7), c(a, r ? .in)
}
var Ee = class extends s {
    priority = 100;
    parse(e, r, a) {
        switch (r) {
            case "w":
                return y(g.week, e);
            case "wo":
                return a.ordinalNumber(e, {
                    unit: "week"
                });
            default:
                return d(r.length, e)
        }
    }
    validate(e, r) {
        return r >= 1 && r <= 53
    }
    set(e, r, a, o) {
        return E(Bt(e, a, o), o)
    }
    incompatibleTokens = ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "i", "t", "T"]
};

function Ht(t, e, r) {
    let a = c(t, r ? .in),
        o = le(a, r) - e;
    return a.setDate(a.getDate() - o * 7), a
}
var Oe = class extends s {
    priority = 100;
    parse(e, r, a) {
        switch (r) {
            case "I":
                return y(g.week, e);
            case "Io":
                return a.ordinalNumber(e, {
                    unit: "week"
                });
            default:
                return d(r.length, e)
        }
    }
    validate(e, r) {
        return r >= 1 && r <= 53
    }
    set(e, r, a) {
        return A(Ht(e, a))
    }
    incompatibleTokens = ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]
};
var aa = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    oa = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    Se = class extends s {
        priority = 90;
        subPriority = 1;
        parse(e, r, a) {
            switch (r) {
                case "d":
                    return y(g.date, e);
                case "do":
                    return a.ordinalNumber(e, {
                        unit: "date"
                    });
                default:
                    return d(r.length, e)
            }
        }
        validate(e, r) {
            let a = e.getFullYear(),
                o = be(a),
                n = e.getMonth();
            return o ? r >= 1 && r <= oa[n] : r >= 1 && r <= aa[n]
        }
        set(e, r, a) {
            return e.setDate(a), e.setHours(0, 0, 0, 0), e
        }
        incompatibleTokens = ["Y", "R", "q", "Q", "w", "I", "D", "i", "e", "c", "t", "T"]
    };
var Me = class extends s {
    priority = 90;
    subpriority = 1;
    parse(e, r, a) {
        switch (r) {
            case "D":
            case "DD":
                return y(g.dayOfYear, e);
            case "Do":
                return a.ordinalNumber(e, {
                    unit: "date"
                });
            default:
                return d(r.length, e)
        }
    }
    validate(e, r) {
        let a = e.getFullYear();
        return be(a) ? r >= 1 && r <= 366 : r >= 1 && r <= 365
    }
    set(e, r, a) {
        return e.setMonth(0, a), e.setHours(0, 0, 0, 0), e
    }
    incompatibleTokens = ["Y", "R", "q", "Q", "M", "L", "w", "I", "d", "E", "i", "e", "c", "t", "T"]
};

function X(t, e, r) {
    let a = O(),
        o = r ? .weekStartsOn ? ? r ? .locale ? .options ? .weekStartsOn ? ? a.weekStartsOn ? ? a.locale ? .options ? .weekStartsOn ? ? 0,
        n = c(t, r ? .in),
        i = n.getDay(),
        w = (e % 7 + 7) % 7,
        m = 7 - o,
        D = e < 0 || e > 6 ? e - (i + m) % 7 : (w + m) % 7 - (i + m) % 7;
    return J(n, D, r)
}
var ke = class extends s {
    priority = 90;
    parse(e, r, a) {
        switch (r) {
            case "E":
            case "EE":
            case "EEE":
                return a.day(e, {
                    width: "abbreviated",
                    context: "formatting"
                }) || a.day(e, {
                    width: "short",
                    context: "formatting"
                }) || a.day(e, {
                    width: "narrow",
                    context: "formatting"
                });
            case "EEEEE":
                return a.day(e, {
                    width: "narrow",
                    context: "formatting"
                });
            case "EEEEEE":
                return a.day(e, {
                    width: "short",
                    context: "formatting"
                }) || a.day(e, {
                    width: "narrow",
                    context: "formatting"
                });
            case "EEEE":
            default:
                return a.day(e, {
                    width: "wide",
                    context: "formatting"
                }) || a.day(e, {
                    width: "abbreviated",
                    context: "formatting"
                }) || a.day(e, {
                    width: "short",
                    context: "formatting"
                }) || a.day(e, {
                    width: "narrow",
                    context: "formatting"
                })
        }
    }
    validate(e, r) {
        return r >= 0 && r <= 6
    }
    set(e, r, a, o) {
        return e = X(e, a, o), e.setHours(0, 0, 0, 0), e
    }
    incompatibleTokens = ["D", "i", "e", "c", "t", "T"]
};
var Ae = class extends s {
    priority = 90;
    parse(e, r, a, o) {
        let n = i => {
            let l = Math.floor((i - 1) / 7) * 7;
            return (i + o.weekStartsOn + 6) % 7 + l
        };
        switch (r) {
            case "e":
            case "ee":
                return x(d(r.length, e), n);
            case "eo":
                return x(a.ordinalNumber(e, {
                    unit: "day"
                }), n);
            case "eee":
                return a.day(e, {
                    width: "abbreviated",
                    context: "formatting"
                }) || a.day(e, {
                    width: "short",
                    context: "formatting"
                }) || a.day(e, {
                    width: "narrow",
                    context: "formatting"
                });
            case "eeeee":
                return a.day(e, {
                    width: "narrow",
                    context: "formatting"
                });
            case "eeeeee":
                return a.day(e, {
                    width: "short",
                    context: "formatting"
                }) || a.day(e, {
                    width: "narrow",
                    context: "formatting"
                });
            case "eeee":
            default:
                return a.day(e, {
                    width: "wide",
                    context: "formatting"
                }) || a.day(e, {
                    width: "abbreviated",
                    context: "formatting"
                }) || a.day(e, {
                    width: "short",
                    context: "formatting"
                }) || a.day(e, {
                    width: "narrow",
                    context: "formatting"
                })
        }
    }
    validate(e, r) {
        return r >= 0 && r <= 6
    }
    set(e, r, a, o) {
        return e = X(e, a, o), e.setHours(0, 0, 0, 0), e
    }
    incompatibleTokens = ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "c", "t", "T"]
};
var Fe = class extends s {
    priority = 90;
    parse(e, r, a, o) {
        let n = i => {
            let l = Math.floor((i - 1) / 7) * 7;
            return (i + o.weekStartsOn + 6) % 7 + l
        };
        switch (r) {
            case "c":
            case "cc":
                return x(d(r.length, e), n);
            case "co":
                return x(a.ordinalNumber(e, {
                    unit: "day"
                }), n);
            case "ccc":
                return a.day(e, {
                    width: "abbreviated",
                    context: "standalone"
                }) || a.day(e, {
                    width: "short",
                    context: "standalone"
                }) || a.day(e, {
                    width: "narrow",
                    context: "standalone"
                });
            case "ccccc":
                return a.day(e, {
                    width: "narrow",
                    context: "standalone"
                });
            case "cccccc":
                return a.day(e, {
                    width: "short",
                    context: "standalone"
                }) || a.day(e, {
                    width: "narrow",
                    context: "standalone"
                });
            case "cccc":
            default:
                return a.day(e, {
                    width: "wide",
                    context: "standalone"
                }) || a.day(e, {
                    width: "abbreviated",
                    context: "standalone"
                }) || a.day(e, {
                    width: "short",
                    context: "standalone"
                }) || a.day(e, {
                    width: "narrow",
                    context: "standalone"
                })
        }
    }
    validate(e, r) {
        return r >= 0 && r <= 6
    }
    set(e, r, a, o) {
        return e = X(e, a, o), e.setHours(0, 0, 0, 0), e
    }
    incompatibleTokens = ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "e", "t", "T"]
};

function Wt(t, e, r) {
    let a = c(t, r ? .in),
        o = Yt(a, r),
        n = e - o;
    return J(a, n, r)
}
var Re = class extends s {
    priority = 90;
    parse(e, r, a) {
        let o = n => n === 0 ? 7 : n;
        switch (r) {
            case "i":
            case "ii":
                return d(r.length, e);
            case "io":
                return a.ordinalNumber(e, {
                    unit: "day"
                });
            case "iii":
                return x(a.day(e, {
                    width: "abbreviated",
                    context: "formatting"
                }) || a.day(e, {
                    width: "short",
                    context: "formatting"
                }) || a.day(e, {
                    width: "narrow",
                    context: "formatting"
                }), o);
            case "iiiii":
                return x(a.day(e, {
                    width: "narrow",
                    context: "formatting"
                }), o);
            case "iiiiii":
                return x(a.day(e, {
                    width: "short",
                    context: "formatting"
                }) || a.day(e, {
                    width: "narrow",
                    context: "formatting"
                }), o);
            case "iiii":
            default:
                return x(a.day(e, {
                    width: "wide",
                    context: "formatting"
                }) || a.day(e, {
                    width: "abbreviated",
                    context: "formatting"
                }) || a.day(e, {
                    width: "short",
                    context: "formatting"
                }) || a.day(e, {
                    width: "narrow",
                    context: "formatting"
                }), o)
        }
    }
    validate(e, r) {
        return r >= 1 && r <= 7
    }
    set(e, r, a) {
        return e = Wt(e, a), e.setHours(0, 0, 0, 0), e
    }
    incompatibleTokens = ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "E", "e", "c", "t", "T"]
};
var Ie = class extends s {
    priority = 80;
    parse(e, r, a) {
        switch (r) {
            case "a":
            case "aa":
            case "aaa":
                return a.dayPeriod(e, {
                    width: "abbreviated",
                    context: "formatting"
                }) || a.dayPeriod(e, {
                    width: "narrow",
                    context: "formatting"
                });
            case "aaaaa":
                return a.dayPeriod(e, {
                    width: "narrow",
                    context: "formatting"
                });
            case "aaaa":
            default:
                return a.dayPeriod(e, {
                    width: "wide",
                    context: "formatting"
                }) || a.dayPeriod(e, {
                    width: "abbreviated",
                    context: "formatting"
                }) || a.dayPeriod(e, {
                    width: "narrow",
                    context: "formatting"
                })
        }
    }
    set(e, r, a) {
        return e.setHours(z(a), 0, 0, 0), e
    }
    incompatibleTokens = ["b", "B", "H", "k", "t", "T"]
};
var Ye = class extends s {
    priority = 80;
    parse(e, r, a) {
        switch (r) {
            case "b":
            case "bb":
            case "bbb":
                return a.dayPeriod(e, {
                    width: "abbreviated",
                    context: "formatting"
                }) || a.dayPeriod(e, {
                    width: "narrow",
                    context: "formatting"
                });
            case "bbbbb":
                return a.dayPeriod(e, {
                    width: "narrow",
                    context: "formatting"
                });
            case "bbbb":
            default:
                return a.dayPeriod(e, {
                    width: "wide",
                    context: "formatting"
                }) || a.dayPeriod(e, {
                    width: "abbreviated",
                    context: "formatting"
                }) || a.dayPeriod(e, {
                    width: "narrow",
                    context: "formatting"
                })
        }
    }
    set(e, r, a) {
        return e.setHours(z(a), 0, 0, 0), e
    }
    incompatibleTokens = ["a", "B", "H", "k", "t", "T"]
};
var Le = class extends s {
    priority = 80;
    parse(e, r, a) {
        switch (r) {
            case "B":
            case "BB":
            case "BBB":
                return a.dayPeriod(e, {
                    width: "abbreviated",
                    context: "formatting"
                }) || a.dayPeriod(e, {
                    width: "narrow",
                    context: "formatting"
                });
            case "BBBBB":
                return a.dayPeriod(e, {
                    width: "narrow",
                    context: "formatting"
                });
            case "BBBB":
            default:
                return a.dayPeriod(e, {
                    width: "wide",
                    context: "formatting"
                }) || a.dayPeriod(e, {
                    width: "abbreviated",
                    context: "formatting"
                }) || a.dayPeriod(e, {
                    width: "narrow",
                    context: "formatting"
                })
        }
    }
    set(e, r, a) {
        return e.setHours(z(a), 0, 0, 0), e
    }
    incompatibleTokens = ["a", "b", "t", "T"]
};
var Be = class extends s {
    priority = 70;
    parse(e, r, a) {
        switch (r) {
            case "h":
                return y(g.hour12h, e);
            case "ho":
                return a.ordinalNumber(e, {
                    unit: "hour"
                });
            default:
                return d(r.length, e)
        }
    }
    validate(e, r) {
        return r >= 1 && r <= 12
    }
    set(e, r, a) {
        let o = e.getHours() >= 12;
        return o && a < 12 ? e.setHours(a + 12, 0, 0, 0) : !o && a === 12 ? e.setHours(0, 0, 0, 0) : e.setHours(a, 0, 0, 0), e
    }
    incompatibleTokens = ["H", "K", "k", "t", "T"]
};
var He = class extends s {
    priority = 70;
    parse(e, r, a) {
        switch (r) {
            case "H":
                return y(g.hour23h, e);
            case "Ho":
                return a.ordinalNumber(e, {
                    unit: "hour"
                });
            default:
                return d(r.length, e)
        }
    }
    validate(e, r) {
        return r >= 0 && r <= 23
    }
    set(e, r, a) {
        return e.setHours(a, 0, 0, 0), e
    }
    incompatibleTokens = ["a", "b", "h", "K", "k", "t", "T"]
};
var We = class extends s {
    priority = 70;
    parse(e, r, a) {
        switch (r) {
            case "K":
                return y(g.hour11h, e);
            case "Ko":
                return a.ordinalNumber(e, {
                    unit: "hour"
                });
            default:
                return d(r.length, e)
        }
    }
    validate(e, r) {
        return r >= 0 && r <= 11
    }
    set(e, r, a) {
        return e.getHours() >= 12 && a < 12 ? e.setHours(a + 12, 0, 0, 0) : e.setHours(a, 0, 0, 0), e
    }
    incompatibleTokens = ["h", "H", "k", "t", "T"]
};
var _e = class extends s {
    priority = 70;
    parse(e, r, a) {
        switch (r) {
            case "k":
                return y(g.hour24h, e);
            case "ko":
                return a.ordinalNumber(e, {
                    unit: "hour"
                });
            default:
                return d(r.length, e)
        }
    }
    validate(e, r) {
        return r >= 1 && r <= 24
    }
    set(e, r, a) {
        let o = a <= 24 ? a % 24 : a;
        return e.setHours(o, 0, 0, 0), e
    }
    incompatibleTokens = ["a", "b", "h", "H", "K", "t", "T"]
};
var $e = class extends s {
    priority = 60;
    parse(e, r, a) {
        switch (r) {
            case "m":
                return y(g.minute, e);
            case "mo":
                return a.ordinalNumber(e, {
                    unit: "minute"
                });
            default:
                return d(r.length, e)
        }
    }
    validate(e, r) {
        return r >= 0 && r <= 59
    }
    set(e, r, a) {
        return e.setMinutes(a, 0, 0), e
    }
    incompatibleTokens = ["t", "T"]
};
var qe = class extends s {
    priority = 50;
    parse(e, r, a) {
        switch (r) {
            case "s":
                return y(g.second, e);
            case "so":
                return a.ordinalNumber(e, {
                    unit: "second"
                });
            default:
                return d(r.length, e)
        }
    }
    validate(e, r) {
        return r >= 0 && r <= 59
    }
    set(e, r, a) {
        return e.setSeconds(a, 0), e
    }
    incompatibleTokens = ["t", "T"]
};
var Ue = class extends s {
    priority = 30;
    parse(e, r) {
        let a = o => Math.trunc(o * Math.pow(10, -r.length + 3));
        return x(d(r.length, e), a)
    }
    set(e, r, a) {
        return e.setMilliseconds(a), e
    }
    incompatibleTokens = ["t", "T"]
};
var Ge = class extends s {
    priority = 10;
    parse(e, r) {
        switch (r) {
            case "X":
                return M(S.basicOptionalMinutes, e);
            case "XX":
                return M(S.basic, e);
            case "XXXX":
                return M(S.basicOptionalSeconds, e);
            case "XXXXX":
                return M(S.extendedOptionalSeconds, e);
            case "XXX":
            default:
                return M(S.extended, e)
        }
    }
    set(e, r, a) {
        return r.timestampIsSet ? e : f(e, e.getTime() - W(e) - a)
    }
    incompatibleTokens = ["t", "T", "x"]
};
var Ke = class extends s {
    priority = 10;
    parse(e, r) {
        switch (r) {
            case "x":
                return M(S.basicOptionalMinutes, e);
            case "xx":
                return M(S.basic, e);
            case "xxxx":
                return M(S.basicOptionalSeconds, e);
            case "xxxxx":
                return M(S.extendedOptionalSeconds, e);
            case "xxx":
            default:
                return M(S.extended, e)
        }
    }
    set(e, r, a) {
        return r.timestampIsSet ? e : f(e, e.getTime() - W(e) - a)
    }
    incompatibleTokens = ["t", "T", "X"]
};
var ze = class extends s {
    priority = 40;
    parse(e) {
        return he(e)
    }
    set(e, r, a) {
        return [f(e, a * 1e3), {
            timestampIsSet: !0
        }]
    }
    incompatibleTokens = "*"
};
var Xe = class extends s {
    priority = 20;
    parse(e) {
        return he(e)
    }
    set(e, r, a) {
        return [f(e, a), {
            timestampIsSet: !0
        }]
    }
    incompatibleTokens = "*"
};
var _t = {
    G: new ye,
    y: new De,
    Y: new we,
    R: new xe,
    u: new Te,
    Q: new ve,
    q: new Ce,
    M: new Pe,
    L: new Ne,
    w: new Ee,
    I: new Oe,
    d: new Se,
    D: new Me,
    E: new ke,
    e: new Ae,
    c: new Fe,
    i: new Re,
    a: new Ie,
    b: new Ye,
    B: new Le,
    h: new Be,
    H: new He,
    K: new We,
    k: new _e,
    m: new $e,
    s: new qe,
    S: new Ue,
    X: new Ge,
    x: new Ke,
    t: new ze,
    T: new Xe
};
var na = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
    ia = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
    sa = /^'([^]*?)'?$/,
    la = /''/g,
    ca = /\S/,
    ua = /[a-zA-Z]/;

function ot(t, e, r, a) {
    let o = () => f(a ? .in || r, NaN),
        n = It(),
        i = a ? .locale ? ? n.locale ? ? ee,
        l = a ? .firstWeekContainsDate ? ? a ? .locale ? .options ? .firstWeekContainsDate ? ? n.firstWeekContainsDate ? ? n.locale ? .options ? .firstWeekContainsDate ? ? 1,
        w = a ? .weekStartsOn ? ? a ? .locale ? .options ? .weekStartsOn ? ? n.weekStartsOn ? ? n.locale ? .options ? .weekStartsOn ? ? 0;
    if (!e) return t ? o() : c(r, a ? .in);
    let m = {
            firstWeekContainsDate: l,
            weekStartsOn: w,
            locale: i
        },
        D = [new fe(a ? .in, r)],
        T = e.match(ia).map(h => {
            let C = h[0];
            if (C in te) {
                let k = te[C];
                return k(h, i.formatLong)
            }
            return h
        }).join("").match(na),
        F = [];
    for (let h of T) {
        !a ? .useAdditionalWeekYearTokens && de(h) && re(h, e, t), !a ? .useAdditionalDayOfYearTokens && ue(h) && re(h, e, t);
        let C = h[0],
            k = _t[C];
        if (k) {
            let {
                incompatibleTokens: lt
            } = k;
            if (Array.isArray(lt)) {
                let ct = F.find(ut => lt.includes(ut.token) || ut.token === C);
                if (ct) throw new RangeError(`The format string mustn't contain \`${ct.fullToken}\` and \`${h}\` at the same time`)
            } else if (k.incompatibleTokens === "*" && F.length > 0) throw new RangeError(`The format string mustn't contain \`${h}\` and any other token at the same time`);
            F.push({
                token: C,
                fullToken: h
            });
            let je = k.run(t, h, i.match, m);
            if (!je) return o();
            D.push(je.setter), t = je.rest
        } else {
            if (C.match(ua)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + C + "`");
            if (h === "''" ? h = "'" : C === "'" && (h = da(h)), t.indexOf(h) === 0) t = t.slice(h.length);
            else return o()
        }
    }
    if (t.length > 0 && ca.test(t)) return o();
    let Je = D.map(h => h.priority).sort((h, C) => C - h).filter((h, C, k) => k.indexOf(h) === C).map(h => D.filter(C => C.priority === h).sort((C, k) => k.subPriority - C.subPriority)).map(h => h[0]),
        I = c(r, a ? .in);
    if (isNaN(+I)) return o();
    let V = {};
    for (let h of Je) {
        if (!h.validate(I, m)) return o();
        let C = h.set(I, V, m);
        Array.isArray(C) ? (I = C[0], Object.assign(V, C[1])) : I = C
    }
    return I
}

function da(t) {
    return t.match(sa)[1].replace(la, "'")
}

function ma(t, e) {
    let r = () => f(e ? .in, NaN),
        a = e ? .additionalDigits ? ? 2,
        o = ha(t),
        n;
    if (o.date) {
        let m = ga(o.date, a);
        n = ba(m.restDateString, m.year)
    }
    if (!n || isNaN(+n)) return r();
    let i = +n,
        l = 0,
        w;
    if (o.time && (l = Da(o.time), isNaN(l))) return r();
    if (o.timezone) {
        if (w = wa(o.timezone), isNaN(w)) return r()
    } else {
        let m = new Date(i + l),
            D = c(0, e ? .in);
        return D.setFullYear(m.getUTCFullYear(), m.getUTCMonth(), m.getUTCDate()), D.setHours(m.getUTCHours(), m.getUTCMinutes(), m.getUTCSeconds(), m.getUTCMilliseconds()), D
    }
    return c(i + l + w, e ? .in)
}
var Ve = {
        dateTimeDelimiter: /[T ]/,
        timeZoneDelimiter: /[Z ]/i,
        timezone: /([Z+-].*)$/
    },
    pa = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,
    fa = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,
    ya = /^([+-])(\d{2})(?::?(\d{2}))?$/;

function ha(t) {
    let e = {},
        r = t.split(Ve.dateTimeDelimiter),
        a;
    if (r.length > 2) return e;
    if (/:/.test(r[0]) ? a = r[0] : (e.date = r[0], a = r[1], Ve.timeZoneDelimiter.test(e.date) && (e.date = t.split(Ve.timeZoneDelimiter)[0], a = t.substr(e.date.length, t.length))), a) {
        let o = Ve.timezone.exec(a);
        o ? (e.time = a.replace(o[1], ""), e.timezone = o[1]) : e.time = a
    }
    return e
}

function ga(t, e) {
    let r = new RegExp("^(?:(\\d{4}|[+-]\\d{" + (4 + e) + "})|(\\d{2}|[+-]\\d{" + (2 + e) + "})$)"),
        a = t.match(r);
    if (!a) return {
        year: NaN,
        restDateString: ""
    };
    let o = a[1] ? parseInt(a[1]) : null,
        n = a[2] ? parseInt(a[2]) : null;
    return {
        year: n === null ? o : n * 100,
        restDateString: t.slice((a[1] || a[2]).length)
    }
}

function ba(t, e) {
    if (e === null) return new Date(NaN);
    let r = t.match(pa);
    if (!r) return new Date(NaN);
    let a = !!r[4],
        o = ae(r[1]),
        n = ae(r[2]) - 1,
        i = ae(r[3]),
        l = ae(r[4]),
        w = ae(r[5]) - 1;
    if (a) return Pa(e, l, w) ? xa(e, l, w) : new Date(NaN); {
        let m = new Date(0);
        return !va(e, n, i) || !Ca(e, o) ? new Date(NaN) : (m.setUTCFullYear(e, n, Math.max(o, i)), m)
    }
}

function ae(t) {
    return t ? parseInt(t) : 1
}

function Da(t) {
    let e = t.match(fa);
    if (!e) return NaN;
    let r = nt(e[1]),
        a = nt(e[2]),
        o = nt(e[3]);
    return Na(r, a, o) ? r * Q + a * Z + o * 1e3 : NaN
}

function nt(t) {
    return t && parseFloat(t.replace(",", ".")) || 0
}

function wa(t) {
    if (t === "Z") return 0;
    let e = t.match(ya);
    if (!e) return 0;
    let r = e[1] === "+" ? -1 : 1,
        a = parseInt(e[2]),
        o = e[3] && parseInt(e[3]) || 0;
    return Ea(a, o) ? r * (a * Q + o * Z) : NaN
}

function xa(t, e, r) {
    let a = new Date(0);
    a.setUTCFullYear(t, 0, 4);
    let o = a.getUTCDay() || 7,
        n = (e - 1) * 7 + r + 1 - o;
    return a.setUTCDate(a.getUTCDate() + n), a
}
var Ta = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function $t(t) {
    return t % 400 === 0 || t % 4 === 0 && t % 100 !== 0
}

function va(t, e, r) {
    return e >= 0 && e <= 11 && r >= 1 && r <= (Ta[e] || ($t(t) ? 29 : 28))
}

function Ca(t, e) {
    return e >= 1 && e <= ($t(t) ? 366 : 365)
}

function Pa(t, e, r) {
    return e >= 1 && e <= 53 && r >= 0 && r <= 6
}

function Na(t, e, r) {
    return t === 24 ? e === 0 && r === 0 : r >= 0 && r < 60 && e >= 0 && e < 60 && t >= 0 && t < 25
}

function Ea(t, e) {
    return e >= 0 && e <= 59
}
var Zu = new Intl.DateTimeFormat("en-US", {
    hourCycle: "h23",
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
}).format(new Date("2014-06-25T04:00:00.123Z"));
var id = 60 * 1e3;

function ka(t) {
    if (t != null && t !== "")
        for (let e of Object.keys(t))
            if (typeof t[e] == "string") {
                let r = Aa(t[e]);
                j(r) && (t[e] = r)
            } else if (Array.isArray(t[e])) {
        let r = t[e]
    } else t[e] && typeof t[e] == "object" && (t[e] = ka(t[e]));
    return t
}

function Aa(t) {
    let e = ot(t, "yyyy-MM-dd", new Date);
    return j(e) ? e : ot(t, "yyyy-MM-dd'T'HH:mm:ss.SSSXX", new Date)
}

function Qd(t) {
    return Rt(t, {
        representation: "date"
    })
}
var em = new Set("0123456789");
var Ut = t => {
        if (typeof t == "object" && t !== null) {
            if (typeof Object.getPrototypeOf == "function") {
                let e = Object.getPrototypeOf(t);
                return e === Object.prototype || e === null
            }
            return Object.prototype.toString.call(t) === "[object Object]"
        }
        return !1
    },
    L = (...t) => t.reduce((e, r) => {
        if (Array.isArray(r)) throw new TypeError("Arguments provided to ts-deepmerge must be objects, not arrays.");
        return Object.keys(r).forEach(a => {
            ["__proto__", "constructor", "prototype"].includes(a) || (Array.isArray(e[a]) && Array.isArray(r[a]) ? e[a] = L.options.mergeArrays ? Array.from(new Set(e[a].concat(r[a]))) : r[a] : Ut(e[a]) && Ut(r[a]) ? e[a] = L(e[a], r[a]) : e[a] = r[a])
        }), e
    }, {}),
    Gt = {
        mergeArrays: !0
    };
L.options = Gt;
L.withOptions = (t, ...e) => {
    L.options = P({
        mergeArrays: !0
    }, t);
    let r = L(...e);
    return L.options = Gt, r
};
var am = L;
var st = [];
st.push(Kt([B.Anonymous, B.User, B.Admin]));
st.push(Kt([B.KPI, B.Admin]));

function Kt(t, e = 1) {
    let r = new Map;
    return t.forEach(a => {
        r.set(a, e), e++
    }), r
}

function sm(t, e) {
    for (let r of st) {
        let a = r.get(t),
            o = r.get(e);
        if (a && o && a >= o) return !0
    }
    return !1
}
var wm = (() => {
    let e = class e {
        constructor() {
            this.flags$ = new dt({
                useEmbeddedCheckout: !1
            }), this.loadFlags()
        }
        loadFlags() {
            let a = this.loadFromStorage();
            a && this.flags$.next(P(P({}, this.flags$.value), a))
        }
        loadFromStorage() {
            try {
                let a = localStorage.getItem("qualtrim_feature_flags");
                return a ? JSON.parse(a) : null
            } catch {
                return null
            }
        }
        saveToStorage(a) {
            try {
                localStorage.setItem("qualtrim_feature_flags", JSON.stringify(a))
            } catch (o) {
                console.warn("Failed to save feature flags to storage:", o)
            }
        }
        isEnabled(a) {
            return this.flags$.pipe(mt(o => o[a]))
        }
        isEnabledSync(a) {
            return this.flags$.value[a]
        }
        getFlags() {
            return this.flags$.asObservable()
        }
        getFlagsSync() {
            return P({}, this.flags$.value)
        }
        enableFlag(a) {
            let o = this.flags$.value,
                n = Y(P({}, o), {
                    [a]: !0
                });
            this.flags$.next(n), this.saveToStorage(n)
        }
        disableFlag(a) {
            let o = this.flags$.value,
                n = Y(P({}, o), {
                    [a]: !1
                });
            this.flags$.next(n), this.saveToStorage(n)
        }
        toggleFlag(a) {
            let o = this.flags$.value,
                n = Y(P({}, o), {
                    [a]: !o[a]
                });
            this.flags$.next(n), this.saveToStorage(n)
        }
        updateFlags(a) {
            let o = P(P({}, this.flags$.value), a);
            this.flags$.next(o), this.saveToStorage(o)
        }
        resetFlags() {
            let a = {
                useEmbeddedCheckout: !1
            };
            this.flags$.next(a), this.saveToStorage(a)
        }
    };
    e.\u0275fac = function(o) {
        return new(o || e)
    }, e.\u0275prov = pt({
        token: e,
        factory: e.\u0275fac,
        providedIn: "root"
    });
    let t = e;
    return t
})();
var u = ["bar", "line"],
    b = ["line"],
    Cm = {
        profitability: "Profitability",
        efficiency: "Efficiency",
        liquidity: "Liquidity",
        leverage: "Leverage",
        "cash-flow-safety": "Cash Flow Safety",
        valuation: "Valuation",
        dividends: "Dividends",
        "per-share": "Per-share",
        "income-statement": "Income Statement",
        "cash-flow": "Cash Flow",
        "balance-sheet": "Balance Sheet"
    },
    Pm = ["profitability", "valuation", "income-statement", "cash-flow", "balance-sheet", "per-share", "dividends", "efficiency", "liquidity", "leverage", "cash-flow-safety"];
var Qe = [{
        key: "grossMargin",
        label: "Gross Margin",
        category: "profitability",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: b,
        popularity: 1,
        isPopular: !0,
        description: "Percent of revenue left after paying direct costs (COGS). Higher can indicate pricing power or efficient delivery.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "grossProfitMargin"
        }
    }, {
        key: "operatingMargin",
        label: "Operating Margin",
        category: "profitability",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: b,
        popularity: 2,
        isPopular: !0,
        description: "Operating profit as a percent of revenue after operating expenses. Useful for comparing core profitability across time and peers.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "operatingProfitMargin"
        }
    }, {
        key: "ebitdaMargin",
        label: "EBITDA Margin",
        category: "profitability",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "EBITDA as a percent of revenue, a common proxy for operating cash profitability.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "ebitdaMargin"
        }
    }, {
        key: "pretaxMargin",
        label: "Pre-tax Margin",
        category: "profitability",
        type: "ratio",
        statType: "change",
        tier: "ADVANCED",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "Profit before taxes as a percent of revenue. Helps separate operating performance from tax effects.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "pretaxProfitMargin"
        }
    }, {
        key: "netMargin",
        label: "Net Margin",
        category: "profitability",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: b,
        popularity: 111,
        isPopular: !0,
        description: "Net income as a percent of revenue after all expenses. Useful for bottom-line profitability.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "netProfitMargin"
        }
    }, {
        key: "taxRateEffective",
        label: "Effective Tax Rate",
        category: "profitability",
        type: "ratio",
        statType: "change",
        tier: "ADVANCED",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "Taxes paid/recorded divided by pre-tax income. Can swing with one-time items, credits, and geographic mix.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "effectiveTaxRate"
        }
    }, {
        key: "assetTurnover",
        label: "Asset Turnover",
        category: "efficiency",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "Revenue generated per dollar of assets. Higher can mean better asset efficiency, but varies by industry.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "assetTurnover"
        }
    }, {
        key: "receivablesTurnover",
        label: "Receivables Turnover",
        category: "efficiency",
        type: "ratio",
        statType: "change",
        tier: "ADVANCED",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "How quickly customers pay (higher is faster). Useful for monitoring credit quality and collections.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "receivablesTurnover"
        }
    }, {
        key: "payablesTurnover",
        label: "Payables Turnover",
        category: "efficiency",
        type: "ratio",
        statType: "change",
        tier: "ADVANCED",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "How quickly the company pays suppliers (higher is faster). Changes can indicate shifting supplier terms.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "payablesTurnover"
        }
    }, {
        key: "inventoryTurnover",
        label: "Inventory Turnover",
        category: "efficiency",
        type: "ratio",
        statType: "change",
        tier: "ADVANCED",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "How quickly inventory is sold and replaced. More useful for product businesses than services.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "inventoryTurnover"
        }
    }, {
        key: "fixedAssetTurnover",
        label: "Fixed-asset Turnover",
        category: "efficiency",
        type: "ratio",
        statType: "change",
        tier: "ADVANCED",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "Revenue generated per dollar of net fixed assets. Best for capital-intensive businesses.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "fixedAssetTurnover"
        }
    }, {
        key: "workingCapitalTurnover",
        label: "Working Capital Turnover",
        category: "efficiency",
        type: "ratio",
        statType: "change",
        tier: "ADVANCED",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "Revenue per dollar of working capital. Can be noisy when working capital is small or negative.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "workingCapitalTurnoverRatio"
        }
    }, {
        key: "currentRatio",
        label: "Current Ratio",
        category: "liquidity",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "Current assets divided by current liabilities. Indicates near-term liquidity.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "currentRatio"
        }
    }, {
        key: "quickRatio",
        label: "Quick Ratio",
        category: "liquidity",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "Liquid current assets (excluding inventory) divided by current liabilities. A stricter liquidity measure.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "quickRatio"
        }
    }, {
        key: "cashRatio",
        label: "Cash Ratio",
        category: "liquidity",
        type: "ratio",
        statType: "change",
        tier: "ADVANCED",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "Cash and equivalents divided by current liabilities. Very conservative view of short-term coverage.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "cashRatio"
        }
    }, {
        key: "debtToEquity",
        label: "Debt / Equity",
        category: "leverage",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: b,
        popularity: 4,
        isPopular: !0,
        description: "Debt relative to shareholders' equity. Helpful for comparing balance sheet leverage.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "debtToEquityRatio"
        }
    }, {
        key: "debtToAssets",
        label: "Debt / Assets",
        category: "leverage",
        type: "ratio",
        statType: "change",
        tier: "ADVANCED",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "Debt as a percent of total assets. Useful for a broad leverage snapshot.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "debtToAssetsRatio"
        }
    }, {
        key: "debtToCapital",
        label: "Debt / Capital",
        category: "leverage",
        type: "ratio",
        statType: "change",
        tier: "ADVANCED",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "Debt divided by total capital (debt + equity). Shows how the company funds itself.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "debtToCapitalRatio"
        }
    }, {
        key: "ltDebtToCapital",
        label: "Long-term Debt / Capital",
        category: "leverage",
        type: "ratio",
        statType: "change",
        tier: "ADVANCED",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "Long-term debt share of total capital. Focuses on structural leverage.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "longTermDebtToCapitalRatio"
        }
    }, {
        key: "financialLeverage",
        label: "Financial Leverage",
        category: "leverage",
        type: "ratio",
        statType: "change",
        tier: "ADVANCED",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "Assets divided by equity, a common leverage measure. Higher means equity supports more assets.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "financialLeverageRatio"
        }
    }, {
        key: "debtToMarketCap",
        label: "Debt / Market Cap",
        category: "leverage",
        type: "ratio",
        statType: "change",
        tier: "ADVANCED",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "Total debt relative to the company's market value. Can move a lot with the stock price.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "debtToMarketCap"
        }
    }, {
        key: "interestCoverage",
        label: "Interest Coverage",
        category: "cash-flow-safety",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "EBIT divided by interest expense, measuring ability to service interest. Higher indicates more debt safety.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "interestCoverageRatio"
        }
    }, {
        key: "debtServiceCoverage",
        label: "Debt Service Coverage",
        category: "cash-flow-safety",
        type: "ratio",
        statType: "change",
        tier: "ADVANCED",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "Cash flow available to cover required debt payments. Often more relevant for credit analysis.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "debtServiceCoverageRatio"
        }
    }, {
        key: "ocfToSales",
        label: "Operating Cash Flow Margin",
        category: "cash-flow-safety",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "Operating cash flow as a percent of revenue. Helps validate earnings quality.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "operatingCashFlowSalesRatio"
        }
    }, {
        key: "ocfRatio",
        label: "Operating Cash Flow Ratio",
        category: "cash-flow-safety",
        type: "ratio",
        statType: "change",
        tier: "ADVANCED",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "Operating cash flow relative to short-term obligations.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "operatingCashFlowRatio"
        }
    }, {
        key: "capexCoverage",
        label: "Capex Coverage",
        category: "cash-flow-safety",
        type: "ratio",
        statType: "change",
        tier: "ADVANCED",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "Operating cash flow relative to capital spending needs. Higher suggests capex is easily funded.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "capitalExpenditureCoverageRatio"
        }
    }, {
        key: "fcfToOcf",
        label: "FCF / OCF",
        category: "cash-flow-safety",
        type: "ratio",
        statType: "change",
        tier: "ADVANCED",
        defaultChartType: "line",
        allowedChartTypes: b,
        isPopular: !1,
        description: "Free cash flow divided by operating cash flow. Indicates how much operating cash remains after capex.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "freeCashFlowOperatingCashFlowRatio"
        }
    }, {
        key: "dailyPrice",
        label: "Stock Price",
        category: "valuation",
        type: "absolute",
        statType: "totalReturn",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: ["line"],
        popularity: 121,
        isPopular: !0,
        description: "Daily closing stock price. Unlike other metrics, this always shows daily data regardless of the frequency setting.",
        source: {
            type: "simple",
            dataSource: "prices",
            field: "close"
        }
    }, {
        key: "marketCap",
        label: "Market Cap",
        category: "valuation",
        type: "absolute",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: ["line"],
        popularity: 110,
        isPopular: !0,
        description: "Daily market capitalization. Shows company size over time using historical data.",
        source: {
            type: "calculator",
            calculatorKey: "marketCapDaily",
            dataSources: ["historical-market-cap"]
        }
    }, {
        key: "pe",
        label: "Price to Earnings",
        category: "valuation",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: ["line"],
        popularity: 115,
        isPopular: !0,
        description: "Price relative to earnings per share (TTM). Daily granularity using most recent quarterly EPS.",
        source: {
            type: "calculator",
            calculatorKey: "peRatioDaily",
            dataSources: ["income-statement", "prices"]
        }
    }, {
        key: "ps",
        label: "Price to Sales",
        category: "valuation",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: ["line"],
        popularity: 114,
        isPopular: !0,
        description: "Price relative to revenue per share (TTM). Daily granularity using most recent quarterly revenue.",
        source: {
            type: "calculator",
            calculatorKey: "psRatioDaily",
            dataSources: ["income-statement", "prices"]
        }
    }, {
        key: "pb",
        label: "Price to Book",
        category: "valuation",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: ["line"],
        isPopular: !1,
        description: "Price relative to book value per share. Daily granularity using most recent quarterly equity.",
        source: {
            type: "calculator",
            calculatorKey: "pbRatioDaily",
            dataSources: ["income-statement", "balance-sheet", "prices"]
        }
    }, {
        key: "evEbitda",
        label: "Enterprise Value to EBITDA",
        category: "valuation",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: ["line"],
        popularity: 7,
        isPopular: !0,
        description: "Enterprise value relative to EBITDA (TTM). Daily EV calculated from market cap plus debt minus cash.",
        source: {
            type: "calculator",
            calculatorKey: "evToEbitdaDaily",
            dataSources: ["income-statement", "balance-sheet", "prices"]
        }
    }, {
        key: "pFcf",
        label: "Price to Free Cash Flow",
        category: "valuation",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: ["line"],
        popularity: 8,
        isPopular: !0,
        description: "Price relative to free cash flow per share (TTM). Daily granularity using most recent quarterly FCF.",
        source: {
            type: "calculator",
            calculatorKey: "priceToCashFlowDaily",
            dataSources: ["cash-flow", "income-statement", "prices"]
        }
    }, {
        key: "pOcf",
        label: "Price to Operating Cash Flow",
        category: "valuation",
        type: "ratio",
        statType: "change",
        tier: "ADVANCED",
        defaultChartType: "line",
        allowedChartTypes: ["line"],
        isPopular: !1,
        description: "Price relative to operating cash flow per share (TTM). Daily granularity using most recent quarterly OCF.",
        source: {
            type: "calculator",
            calculatorKey: "priceToOperatingCashFlowDaily",
            dataSources: ["cash-flow", "income-statement", "prices"]
        }
    }, {
        key: "peg",
        label: "Price to Earnings Growth",
        category: "valuation",
        type: "ratio",
        statType: "change",
        tier: "ADVANCED",
        defaultChartType: "line",
        allowedChartTypes: ["line"],
        isPopular: !1,
        description: "Price to Earnings adjusted for expected growth. Daily Price to Earnings divided by forward growth rate.",
        source: {
            type: "calculator",
            calculatorKey: "pegRatioDaily",
            dataSources: ["income-statement", "ratios", "prices"]
        }
    }, {
        key: "roe",
        label: "Return on Equity",
        category: "profitability",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: b,
        popularity: 16,
        isPopular: !1,
        description: "Net Income divided by Shareholder Equity",
        source: {
            type: "simple",
            dataSource: "key-metrics",
            field: "returnOnEquity"
        }
    }, {
        key: "roic",
        label: "Return on Invested Capital",
        category: "profitability",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: b,
        popularity: 16,
        isPopular: !1,
        description: "Net Income divided by Invested Capital",
        source: {
            type: "simple",
            dataSource: "key-metrics",
            field: "returnOnInvestedCapital"
        }
    }, {
        key: "roce",
        label: "Return on Capital Employed",
        category: "profitability",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: b,
        popularity: 16,
        isPopular: !1,
        description: "Net Income divided by Capital Employed",
        source: {
            type: "simple",
            dataSource: "key-metrics",
            field: "returnOnCapitalEmployed"
        }
    }, {
        key: "dividendYield",
        label: "Dividend Yield",
        category: "dividends",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: b,
        popularity: 9,
        isPopular: !0,
        description: "Dividend paid as a percent of the current stock price. Can rise when price falls.",
        source: {
            type: "calculator",
            calculatorKey: "dividendYieldTTM",
            dataSources: ["ratios"]
        }
    }, {
        key: "payoutRatio",
        label: "Dividend Payout Ratio",
        category: "dividends",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: b,
        popularity: 10,
        isPopular: !0,
        description: "Dividends paid as a percent of earnings. Helps gauge sustainability.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "dividendPayoutRatio"
        }
    }, {
        key: "dividendPerShare",
        label: "Dividend / Share",
        category: "dividends",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Cash dividends paid per share over the period. Useful for tracking dividend growth.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "dividendPerShare"
        }
    }, {
        key: "revenuePerShare",
        label: "Revenue / Share",
        category: "per-share",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Revenue divided by shares outstanding. Helpful for comparing growth while accounting for dilution.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "revenuePerShare"
        }
    }, {
        key: "netIncomePerShare",
        label: "Net Income / Share",
        category: "per-share",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Net income divided by shares outstanding.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "netIncomePerShare"
        }
    }, {
        key: "cashPerShare",
        label: "Cash / Share",
        category: "per-share",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Cash and equivalents divided by shares outstanding. A quick sense of cash backing per share.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "cashPerShare"
        }
    }, {
        key: "bookValuePerShare",
        label: "Book Value / Share",
        category: "per-share",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Equity book value per share. More useful for asset-heavy businesses and financials.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "bookValuePerShare"
        }
    }, {
        key: "ocfPerShare",
        label: "Operating Cash Flow / Share",
        category: "per-share",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Operating cash flow per share. Useful for per-share cash generation trends.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "operatingCashFlowPerShare"
        }
    }, {
        key: "fcfPerShare",
        label: "Free Cash Flow / Share",
        category: "per-share",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        popularity: 11,
        isPopular: !0,
        description: "Free cash flow per share, a popular owner-earnings style metric.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "freeCashFlowPerShare"
        }
    }, {
        key: "capexPerShare",
        label: "Capital Expenditures / Share",
        category: "per-share",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Capital expenditures per share. Helps spot rising reinvestment needs.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "capexPerShare"
        }
    }, {
        key: "debtPerShare",
        label: "Interest-bearing Debt / Share",
        category: "per-share",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Debt per share outstanding. Useful for seeing leverage changes on a per-share basis.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "interestDebtPerShare"
        }
    }, {
        key: "tangibleBookPerShare",
        label: "Tangible Book / Share",
        category: "per-share",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Book value excluding goodwill and intangibles. Can be negative for acquisitive firms.",
        source: {
            type: "simple",
            dataSource: "ratios",
            field: "tangibleBookValuePerShare"
        }
    }, {
        key: "revenue",
        label: "Revenue",
        category: "income-statement",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        popularity: 120,
        isPopular: !0,
        description: "Total sales for the period. The starting point for most growth analysis.",
        source: {
            type: "simple",
            dataSource: "income-statement",
            field: "revenue"
        }
    }, {
        key: "grossProfit",
        label: "Gross Profit",
        category: "income-statement",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Revenue minus cost of revenue. Tracks how much value remains to cover operating costs.",
        source: {
            type: "simple",
            dataSource: "income-statement",
            field: "grossProfit"
        }
    }, {
        key: "operatingIncome",
        label: "Operating Income (EBIT)",
        category: "income-statement",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        popularity: 13,
        isPopular: !0,
        description: "Profit from core operations before interest and taxes. A key measure for operating leverage.",
        source: {
            type: "simple",
            dataSource: "income-statement",
            field: "operatingIncome"
        }
    }, {
        key: "ebitda",
        label: "EBITDA",
        category: "income-statement",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        popularity: 112,
        isPopular: !0,
        description: "Earnings before interest, taxes, depreciation and amortization. Commonly used for valuation multiples.",
        source: {
            type: "simple",
            dataSource: "income-statement",
            field: "ebitda"
        }
    }, {
        key: "netIncome",
        label: "Net Income",
        category: "income-statement",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        popularity: 113,
        isPopular: !0,
        description: "Bottom-line profit after all expenses and taxes. Often noisy due to one-time items.",
        source: {
            type: "simple",
            dataSource: "income-statement",
            field: "netIncome"
        }
    }, {
        key: "epsDiluted",
        label: "EPS (diluted)",
        category: "income-statement",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: u,
        popularity: 118,
        isPopular: !0,
        description: "Earnings per diluted share, reflecting potential dilution. Commonly used in valuation.",
        source: {
            type: "simple",
            dataSource: "income-statement",
            field: "epsDiluted"
        }
    }, {
        key: "sharesDiluted",
        label: "Shares Outstanding",
        category: "income-statement",
        type: "count",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !0,
        popularity: 40,
        ttmAggregation: "latest",
        description: "Weighted average diluted shares outstanding. Useful for tracking dilution or buybacks.",
        source: {
            type: "simple",
            dataSource: "income-statement",
            field: "weightedAverageShsOutDil"
        }
    }, {
        key: "costOfRevenue",
        label: "Cost of Revenue",
        category: "income-statement",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Direct costs required to produce or deliver revenue. Helps diagnose margin compression.",
        source: {
            type: "simple",
            dataSource: "income-statement",
            field: "costOfRevenue"
        }
    }, {
        key: "sga",
        label: "SG&A",
        category: "income-statement",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Operating overhead including selling, general, and administrative costs.",
        source: {
            type: "simple",
            dataSource: "income-statement",
            field: "sellingGeneralAndAdministrativeExpenses"
        }
    }, {
        key: "interestExpense",
        label: "Interest Expense",
        category: "income-statement",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Cost of servicing debt. Important when leverage is meaningful or rates are rising.",
        source: {
            type: "simple",
            dataSource: "income-statement",
            field: "interestExpense"
        }
    }, {
        key: "incomeTaxExpense",
        label: "Income Tax Expense",
        category: "income-statement",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Income taxes recorded for the period. Can differ from cash taxes paid due to deferred items.",
        source: {
            type: "simple",
            dataSource: "income-statement",
            field: "incomeTaxExpense"
        }
    }, {
        key: "cfo",
        label: "Operating Cash Flow",
        category: "cash-flow",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        popularity: 17,
        isPopular: !0,
        description: "Cash generated from core operations. Often used to validate earnings quality.",
        source: {
            type: "simple",
            dataSource: "cash-flow",
            field: "operatingCashFlow"
        }
    }, {
        key: "capex",
        label: "Capital Expenditures",
        category: "cash-flow",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        popularity: 116,
        isPopular: !0,
        description: "Cash spent on long-term assets and equipment. Needed to sustain or grow the business.",
        source: {
            type: "simple",
            dataSource: "cash-flow",
            field: "capitalExpenditure"
        }
    }, {
        key: "fcf",
        label: "Free Cash Flow",
        category: "cash-flow",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        popularity: 117,
        isPopular: !0,
        description: 'Operating cash flow minus capital expenditures. A key "owner cash" metric.',
        source: {
            type: "simple",
            dataSource: "cash-flow",
            field: "freeCashFlow"
        }
    }, {
        key: "cfi",
        label: "Investing Cash Flow",
        category: "cash-flow",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Cash used for (or generated from) investments and acquisitions.",
        source: {
            type: "simple",
            dataSource: "cash-flow",
            field: "netCashProvidedByInvestingActivities"
        }
    }, {
        key: "cff",
        label: "Financing Cash Flow",
        category: "cash-flow",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Cash from debt, equity issuance, repurchases, and dividends.",
        source: {
            type: "simple",
            dataSource: "cash-flow",
            field: "netCashProvidedByFinancingActivities"
        }
    }, {
        key: "netChangeInCash",
        label: "Net Change in Cash",
        category: "cash-flow",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Net change in cash during the period. Reconciles operating, investing, and financing flows.",
        source: {
            type: "simple",
            dataSource: "cash-flow",
            field: "netChangeInCash"
        }
    }, {
        key: "cashEnd",
        label: "Cash at End of Period",
        category: "cash-flow",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Ending cash balance for the period. Useful for liquidity context alongside debt.",
        source: {
            type: "simple",
            dataSource: "cash-flow",
            field: "cashAtEndOfPeriod"
        }
    }, {
        key: "dividendsPaid",
        label: "Dividends Paid",
        category: "cash-flow",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Cash paid out to shareholders as dividends. Helpful for tracking capital returns.",
        source: {
            type: "simple",
            dataSource: "cash-flow",
            field: "dividendsPaid"
        }
    }, {
        key: "shareRepurchases",
        label: "Share Repurchases",
        category: "cash-flow",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Cash used to buy back shares. A major driver of per-share growth.",
        source: {
            type: "simple",
            dataSource: "cash-flow",
            field: "commonStockRepurchased"
        }
    }, {
        key: "sbc",
        label: "Stock-based Compensation",
        category: "cash-flow",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !0,
        popularity: 35,
        description: "Non-cash compensation added back in operating cash flow. Useful for judging true dilution cost.",
        source: {
            type: "simple",
            dataSource: "cash-flow",
            field: "stockBasedCompensation"
        }
    }, {
        key: "daCfo",
        label: "Depreciation and Amortization (CFO add-back)",
        category: "cash-flow",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Depreciation and amortization added back in operating cash flow.",
        source: {
            type: "simple",
            dataSource: "cash-flow",
            field: "depreciationAndAmortization"
        }
    }, {
        key: "changeInWorkingCapital",
        label: "Change in Working Capital",
        category: "cash-flow",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Cash impact from changes in receivables, payables, and other working capital items.",
        source: {
            type: "simple",
            dataSource: "cash-flow",
            field: "changeInWorkingCapital"
        }
    }, {
        key: "cashAndEquivalents",
        label: "Cash & Equivalents",
        category: "balance-sheet",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        popularity: 20,
        isPopular: !0,
        description: "Cash available immediately. A key liquidity input for net debt and runway analysis.",
        source: {
            type: "simple",
            dataSource: "balance-sheet",
            field: "cashAndCashEquivalents"
        }
    }, {
        key: "stInvestments",
        label: "Short-term Investments",
        category: "balance-sheet",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Highly liquid securities typically convertible within a year.",
        source: {
            type: "simple",
            dataSource: "balance-sheet",
            field: "shortTermInvestments"
        }
    }, {
        key: "totalCurrentAssets",
        label: "Total Current Assets",
        category: "balance-sheet",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Assets expected to convert to cash within one year. Useful for liquidity context.",
        source: {
            type: "simple",
            dataSource: "balance-sheet",
            field: "totalCurrentAssets"
        }
    }, {
        key: "ppeNet",
        label: "PP&E (net)",
        category: "balance-sheet",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Property, plant, and equipment net of depreciation. Indicates capital intensity.",
        source: {
            type: "simple",
            dataSource: "balance-sheet",
            field: "propertyPlantEquipmentNet"
        }
    }, {
        key: "goodwill",
        label: "Goodwill",
        category: "balance-sheet",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Acquisition premium recorded on the balance sheet. Large goodwill can signal impairment risk.",
        source: {
            type: "simple",
            dataSource: "balance-sheet",
            field: "goodwill"
        }
    }, {
        key: "intangibles",
        label: "Intangible Assets",
        category: "balance-sheet",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Identifiable intangible assets like customer lists or patents.",
        source: {
            type: "simple",
            dataSource: "balance-sheet",
            field: "intangibleAssets"
        }
    }, {
        key: "totalAssets",
        label: "Total Assets",
        category: "balance-sheet",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Everything the company owns on the balance sheet. Useful for scale and leverage context.",
        source: {
            type: "simple",
            dataSource: "balance-sheet",
            field: "totalAssets"
        }
    }, {
        key: "accountsPayable",
        label: "Accounts Payable",
        category: "balance-sheet",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Bills owed to suppliers and vendors. Helps understand working capital dynamics.",
        source: {
            type: "simple",
            dataSource: "balance-sheet",
            field: "accountPayables"
        }
    }, {
        key: "deferredRevenue",
        label: "Deferred Revenue",
        category: "balance-sheet",
        type: "absolute",
        statType: "cagr",
        tier: "ADVANCED",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Cash collected for services/products not yet delivered. Common in subscription models.",
        source: {
            type: "simple",
            dataSource: "balance-sheet",
            field: "deferredRevenue"
        }
    }, {
        key: "totalCurrentLiabilities",
        label: "Total Current Liabilities",
        category: "balance-sheet",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "Obligations due within one year. Useful for liquidity stress context.",
        source: {
            type: "simple",
            dataSource: "balance-sheet",
            field: "totalCurrentLiabilities"
        }
    }, {
        key: "longTermDebt",
        label: "Long-term Debt",
        category: "balance-sheet",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        popularity: 21,
        isPopular: !0,
        description: "Debt due beyond one year. A key input for leverage and interest burden analysis.",
        source: {
            type: "simple",
            dataSource: "balance-sheet",
            field: "longTermDebt"
        }
    }, {
        key: "totalDebt",
        label: "Total Debt",
        category: "balance-sheet",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        popularity: 22,
        isPopular: !0,
        description: "Total interest-bearing debt outstanding. Used for leverage ratios and enterprise value.",
        source: {
            type: "simple",
            dataSource: "balance-sheet",
            field: "totalDebt"
        }
    }, {
        key: "netDebt",
        label: "Net Debt",
        category: "balance-sheet",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        popularity: 23,
        isPopular: !0,
        description: "Total debt minus cash and equivalents. Common measure for leverage and EV calculations.",
        source: {
            type: "simple",
            dataSource: "balance-sheet",
            field: "netDebt"
        }
    }, {
        key: "totalLiabilities",
        label: "Total Liabilities",
        category: "balance-sheet",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        isPopular: !1,
        description: "All obligations owed, current and long-term. Useful for balance sheet risk context.",
        source: {
            type: "simple",
            dataSource: "balance-sheet",
            field: "totalLiabilities"
        }
    }, {
        key: "totalEquity",
        label: "Total Equity",
        category: "balance-sheet",
        type: "absolute",
        statType: "cagr",
        tier: "CORE",
        defaultChartType: "bar",
        allowedChartTypes: u,
        popularity: 24,
        isPopular: !0,
        description: "Shareholders' residual claim after liabilities. Useful for book value and capital structure.",
        source: {
            type: "simple",
            dataSource: "balance-sheet",
            field: "totalEquity"
        }
    }, {
        key: "fcfMargin",
        label: "Free Cash Flow Margin",
        category: "profitability",
        type: "ratio",
        statType: "change",
        tier: "CORE",
        defaultChartType: "line",
        allowedChartTypes: ["line", "bar"],
        popularity: 20,
        isPopular: !1,
        description: "Free Cash Flow as percentage of Revenue",
        source: {
            type: "formula",
            dataSources: ["income-statement", "cash-flow"],
            formula: "(fcf / revenue)",
            fields: {
                fcf: {
                    source: "cash-flow",
                    field: "freeCashFlow"
                },
                revenue: {
                    source: "income-statement",
                    field: "revenue"
                }
            }
        }
    }],
    zt = {
        grossMargin: "Gross Mgn",
        operatingMargin: "Op Mgn",
        ebitdaMargin: "EBITDA Mgn",
        pretaxMargin: "Pretax Mgn",
        netMargin: "Net Mgn",
        taxRateEffective: "Eff Tax Rate",
        fcfMargin: "FCF Mgn",
        roe: "ROE",
        assetTurnover: "Asset Turn",
        receivablesTurnover: "Recv Turn",
        payablesTurnover: "Payables Turn",
        inventoryTurnover: "Inv Turn",
        fixedAssetTurnover: "Fixed Asset Turn",
        workingCapitalTurnover: "WC Turn",
        currentRatio: "Curr Ratio",
        quickRatio: "Quick Ratio",
        cashRatio: "Cash Ratio",
        debtToEquity: "D/E",
        debtToAssets: "D/A",
        debtToCapital: "D/Cap",
        ltDebtToCapital: "LT D/Cap",
        financialLeverage: "Fin Leverage",
        debtToMarketCap: "D/Mkt Cap",
        interestCoverage: "Int Coverage",
        debtServiceCoverage: "Debt Svc Cov",
        ocfToSales: "OCF Margin",
        ocfRatio: "OCF Ratio",
        capexCoverage: "CapEx Cov",
        fcfToOcf: "FCF/OCF",
        dailyPrice: "Price",
        marketCap: "Mkt Cap",
        pe: "P/E",
        ps: "P/S",
        pb: "P/B",
        evEbitda: "EV/EBITDA",
        pFcf: "P/FCF",
        pOcf: "P/OCF",
        peg: "PEG",
        peRatio: "P/E",
        psRatio: "P/S",
        priceToCashFlow: "P/CF",
        dividendYield: "Div Yield",
        payoutRatio: "Payout Ratio",
        dividendPerShare: "Div/Share",
        revenuePerShare: "Rev/Share",
        netIncomePerShare: "NI/Share",
        cashPerShare: "Cash/Share",
        bookValuePerShare: "BV/Share",
        ocfPerShare: "OCF/Share",
        fcfPerShare: "FCF/Share",
        capexPerShare: "CapEx/Share",
        debtPerShare: "Debt/Share",
        tangibleBookPerShare: "Tang BV/Share",
        eps: "EPS",
        revenue: "Rev",
        grossProfit: "Gross Pft",
        operatingIncome: "Op Inc",
        ebitda: "EBITDA",
        netIncome: "Net Inc",
        epsDiluted: "EPS Dil",
        sharesDiluted: "Shares Out",
        costOfRevenue: "COGS",
        sga: "SG&A",
        interestExpense: "Int Exp",
        incomeTaxExpense: "Tax Exp",
        cfo: "OCF",
        capex: "CapEx",
        fcf: "FCF",
        cfi: "Inv CF",
        cff: "Fin CF",
        netChangeInCash: "Net Cash Chg",
        cashEnd: "Cash End",
        dividendsPaid: "Div Paid",
        shareRepurchases: "Buybacks",
        sbc: "SBC",
        daCfo: "D&A",
        changeInWorkingCapital: "WC Change",
        freeCashFlow: "FCF",
        operatingCashFlow: "OCF",
        cashAndEquivalents: "Cash & Eq",
        stInvestments: "ST Invest",
        totalCurrentAssets: "Curr Assets",
        ppeNet: "PP&E",
        goodwill: "Goodwill",
        intangibles: "Intangibles",
        totalAssets: "Total Assets",
        accountsPayable: "Acct Pay",
        deferredRevenue: "Def Rev",
        totalCurrentLiabilities: "Curr Liab",
        longTermDebt: "LT Debt",
        totalDebt: "Total Debt",
        netDebt: "Net Debt",
        totalLiabilities: "Total Liab",
        totalEquity: "Total Equity"
    };

function Om(t) {
    return zt[t] ? zt[t] : Qe.find(r => r.key === t) ? .label ? ? t
}

function Sm(t) {
    return Qe.find(e => e.key === t)
}

function Mm(t = 10) {
    return Qe.filter(e => e.isPopular).sort((e, r) => (r.popularity ? ? 0) - (e.popularity ? ? 0)).slice(0, t)
}

function km(t) {
    return Qe.filter(e => e.category === t)
}
var Xt = {
        grossMargin: {
            family: "percentage",
            displayFormat: "{value}%",
            decimals: 1
        },
        operatingMargin: {
            family: "percentage",
            displayFormat: "{value}%",
            decimals: 1
        },
        ebitdaMargin: {
            family: "percentage",
            displayFormat: "{value}%",
            decimals: 1
        },
        pretaxMargin: {
            family: "percentage",
            displayFormat: "{value}%",
            decimals: 1
        },
        netMargin: {
            family: "percentage",
            displayFormat: "{value}%",
            decimals: 1
        },
        fcfMargin: {
            family: "percentage",
            displayFormat: "{value}%",
            decimals: 1
        },
        taxRateEffective: {
            family: "percentage",
            displayFormat: "{value}%",
            decimals: 1
        },
        dividendYield: {
            family: "percentage",
            displayFormat: "{value}%",
            decimals: 2
        },
        payoutRatio: {
            family: "percentage",
            displayFormat: "{value}%",
            decimals: 1
        },
        ocfToSales: {
            family: "percentage",
            displayFormat: "{value}%",
            decimals: 1
        },
        fcfToOcf: {
            family: "percentage",
            displayFormat: "{value}%",
            decimals: 1
        },
        roe: {
            family: "percentage",
            displayFormat: "{value}%",
            decimals: 1
        },
        roic: {
            family: "percentage",
            displayFormat: "{value}%",
            decimals: 1
        },
        roce: {
            family: "percentage",
            displayFormat: "{value}%",
            decimals: 1
        },
        pe: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 1
        },
        ps: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 1
        },
        pb: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 1
        },
        evEbitda: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 1
        },
        pFcf: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 1
        },
        pOcf: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 1
        },
        peg: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 2
        },
        peRatio: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 1
        },
        psRatio: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 1
        },
        priceToCashFlow: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 1
        },
        debtToEquity: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 2
        },
        debtToAssets: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 2
        },
        debtToCapital: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 2
        },
        ltDebtToCapital: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 2
        },
        financialLeverage: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 2
        },
        debtToMarketCap: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 2
        },
        currentRatio: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 2
        },
        quickRatio: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 2
        },
        cashRatio: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 2
        },
        assetTurnover: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 2
        },
        receivablesTurnover: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 1
        },
        payablesTurnover: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 1
        },
        inventoryTurnover: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 1
        },
        fixedAssetTurnover: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 1
        },
        workingCapitalTurnover: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 1
        },
        interestCoverage: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 1,
            isolated: !0
        },
        debtServiceCoverage: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 1,
            isolated: !0
        },
        ocfRatio: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 1
        },
        capexCoverage: {
            family: "multiple",
            displayFormat: "{value}x",
            decimals: 1
        },
        dailyPrice: {
            family: "dailyPrice",
            displayFormat: "${value}",
            decimals: 2
        },
        marketCap: {
            family: "marketCap",
            displayFormat: "${value}",
            decimals: 0
        },
        revenue: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        grossProfit: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        operatingIncome: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        ebitda: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        netIncome: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        costOfRevenue: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        sga: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        interestExpense: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        incomeTaxExpense: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        cfo: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        capex: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        fcf: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        cfi: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        cff: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        netChangeInCash: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        cashEnd: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        dividendsPaid: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        shareRepurchases: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        sbc: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        daCfo: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        changeInWorkingCapital: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        freeCashFlow: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        operatingCashFlow: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        cashAndEquivalents: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        stInvestments: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        totalCurrentAssets: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        ppeNet: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        goodwill: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        intangibles: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        totalAssets: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        accountsPayable: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        deferredRevenue: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        totalCurrentLiabilities: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        longTermDebt: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        totalDebt: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        netDebt: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        totalLiabilities: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        totalEquity: {
            family: "currency",
            displayFormat: "${value}",
            decimals: 0
        },
        eps: {
            family: "perShare",
            displayFormat: "${value}",
            decimals: 2
        },
        epsDiluted: {
            family: "perShare",
            displayFormat: "${value}",
            decimals: 2
        },
        revenuePerShare: {
            family: "perShare",
            displayFormat: "${value}",
            decimals: 2
        },
        netIncomePerShare: {
            family: "perShare",
            displayFormat: "${value}",
            decimals: 2
        },
        cashPerShare: {
            family: "perShare",
            displayFormat: "${value}",
            decimals: 2
        },
        bookValuePerShare: {
            family: "perShare",
            displayFormat: "${value}",
            decimals: 2
        },
        ocfPerShare: {
            family: "perShare",
            displayFormat: "${value}",
            decimals: 2
        },
        fcfPerShare: {
            family: "perShare",
            displayFormat: "${value}",
            decimals: 2
        },
        capexPerShare: {
            family: "perShare",
            displayFormat: "${value}",
            decimals: 2
        },
        debtPerShare: {
            family: "perShare",
            displayFormat: "${value}",
            decimals: 2
        },
        tangibleBookPerShare: {
            family: "perShare",
            displayFormat: "${value}",
            decimals: 2
        },
        dividendPerShare: {
            family: "perShare",
            displayFormat: "${value}",
            decimals: 2
        },
        sharesDiluted: {
            family: "count",
            displayFormat: "{value}",
            decimals: 0
        }
    },
    Am = {
        percentage: {
            type: "absolute",
            value: 50
        },
        multiple: {
            type: "ratio",
            value: 10
        },
        currency: {
            type: "ratio",
            value: 10
        },
        perShare: {
            type: "ratio",
            value: 10
        },
        count: {
            type: "ratio",
            value: 10
        },
        dailyPrice: {
            type: "ratio",
            value: 10
        },
        marketCap: {
            type: "ratio",
            value: 10
        }
    };

function Fm(t) {
    return Xt[t] ? .family ? ? "currency"
}

function Rm(t) {
    return Xt[t] ? .isolated ? ? !1
}
var Fa = "kpi:";

function Ym(t) {
    return t.startsWith(Fa)
}
var $m = [{
    code: "en",
    label: "English"
}, {
    code: "es",
    label: "Spanish"
}, {
    code: "fr",
    label: "French"
}, {
    code: "pt",
    label: "Portuguese"
}, {
    code: "de",
    label: "German"
}, {
    code: "it",
    label: "Italian"
}, {
    code: "ja",
    label: "Japanese"
}, {
    code: "ko",
    label: "Korean"
}, {
    code: "zh-CN",
    label: "Chinese (Simplified)"
}, {
    code: "zh-TW",
    label: "Chinese (Traditional)"
}, {
    code: "ru",
    label: "Russian"
}, {
    code: "ar",
    label: "Arabic"
}, {
    code: "hi",
    label: "Hindi"
}];
var Ra = /(?:^|[._-])([a-z]{2,3}(?:-[A-Za-z]{2,4})?)$/i;

function Um(t, e) {
    if (!/\.(srt|vtt)$/i.test(t)) return null;
    let r = t.replace(/\.(srt|vtt)$/i, "");
    if (!r) return null;
    let a = r.match(Ra);
    if (!a) return null;
    let o = a[1],
        [n, i] = o.split("-"),
        l = i ? `${n.toLowerCase()}-${i.toUpperCase()}` : n.toLowerCase();
    return e.find(w => w.code === l) ? ? null
}

function Km(t) {
    let e = [],
        r = [];
    return t.split(/\r?\n/).forEach((o, n) => {
        let i = n + 1,
            l = o.trim();
        if (!l) return;
        let w = l.indexOf(",");
        if (w === -1) {
            r.push(`line ${i}: missing ',' separator between timestamp and title`);
            return
        }
        let m = l.slice(0, w).trim(),
            D = l.slice(w + 1).trim(),
            T = Ia(m);
        if (T === null) {
            r.push(`line ${i}: invalid timestamp '${m}'`);
            return
        }
        if (!D) {
            r.push(`line ${i}: empty title`);
            return
        }
        e.push({
            startSec: T,
            title: D
        })
    }), {
        chapters: e,
        errors: r
    }
}

function Ia(t) {
    let e = t.split(":");
    if (e.length !== 2 && e.length !== 3) return null;
    let r = e.map(i => Number(i));
    if (r.some(i => !Number.isFinite(i) || i < 0)) return null;
    if (e.length === 2) {
        let [i, l] = r;
        return i * 60 + l
    }
    let [a, o, n] = r;
    return a * 3600 + o * 60 + n
}

function Xm(t, e = new Date) {
    if (!t) return !1;
    let r = e.getTime() - t.getTime();
    return r < 0 ? !1 : r < 10080 * 60 * 1e3
}
export {
    Vt as a, Zt as b, N as c, Ya as d, Qt as e, Jt as f, jt as g, er as h, v as i, La as j, Ba as k, rr as l, B as m, Xa as n, Va as o, Wa as p, _a as q, tr as r, $a as s, ar as t, or as u, nr as v, ja as w, eo as x, to as y, ir as z, sr as A, lr as B, cr as C, lo as D, uo as E, jo as F, ur as G, en as H, tn as I, rn as J, f as K, c as L, J as M, E as N, gt as O, bt as P, xt as Q, ns as R, Rt as S, jr as T, ea as U, ma as V, ka as W, Aa as X, Qd as Y, am as Z, sm as _, wm as $, Cm as aa, Pm as ba, Qe as ca, Om as da, Sm as ea, Mm as fa, km as ga, Am as ha, Fm as ia, Rm as ja, Ym as ka, $m as la, Um as ma, Km as na, Xm as oa
};