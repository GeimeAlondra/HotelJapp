package com.empresa.hoteljapp.app.auth;

public class JwtConfig {
	
	public static final String RSA_PRIVADA = "-----BEGIN RSA PRIVATE KEY-----\r\n"
			+ "MIIEpAIBAAKCAQEAtjLoGb/pykI+FhZ45U+fMR8MXUtPltVC2CeODulIiSCBjUuB\r\n"
			+ "LJHxjOtbRw+K0ENUzvfoSXQkadmA7oijLEP7PLMztsO+RVp/foPZTED6IITisBch\r\n"
			+ "9K/u7pbXNkUyhMLKh82lLvFalRLfwKvuJFLhSsHad6/snMHdC58ZyXp3WCHhg2hC\r\n"
			+ "XwRqUkWPXnmt2LR8wF/8djmzXhu2poH76fxgcU5+z1pOPuJR33o37S9eOfM4Uerp\r\n"
			+ "R49ElqgkHvNSJX2n+vUQWach3xVI/Xz2uW7n/apuuJScrGBBiLBzs2O7tjHRCrdD\r\n"
			+ "53CGcLMNeXILGaV8u3VvRX3WsSGV570A8NGVgQIDAQABAoIBAQCc/Hfn1+gFEdaV\r\n"
			+ "CX/ZdSVhGbN5ny5QdChIPqy0RGTvYka+C9SdJpLOLOxU6htdHuav/gLzZ1MIsRPa\r\n"
			+ "c3jE5z5OKsngLACBmVxJEink/geGhXkc6JGlVwG0Kdv9Mto4ce433QT60ZKO59hL\r\n"
			+ "Ftj2C0N7OlSW08o3twJSxR9e7lpuYC7CwiDai/il8Dfkmmf+JVxeQUsZL7hdRqju\r\n"
			+ "AN4W/q/E2TCvZweRZ9QB0ArpV1O72PXqLOW0rJF79Bk09BrXrhIBn222Lh6gS0ed\r\n"
			+ "8UPo+KHJ+5PrFjzN8G31w8Mixu0uFGSRyVUajzZvSRmKE7GnlGbDoGD9sGMKWidl\r\n"
			+ "FMxjZWHBAoGBANxwSFA31hYmhBm/J+BEx5wjIp5XKi0qC3Rhbp49CYoZ4KESgJ43\r\n"
			+ "VBAsNFqGNccVPJjLJYGmB/6Vkv3/IFnU/lfwZKnQazhfn/ibJRzQBiadaVGj2B/A\r\n"
			+ "nsolw0pnX5ybrYAR7KpvgKHZxFXzhB3hOKyWHIYk1G9ujWXubpKYgaOdAoGBANOX\r\n"
			+ "ZC/AcnsKur3UMDdC4Kllvdw3Drgj7bQKYqXnkqQhT/4DieJCWXGMhR0QpWzEgivQ\r\n"
			+ "9p8YpDSvCVacPJWTLCjtYTNIGMz6441PNSb0JGUriDon94PiNikAKPIRIAe5XXFZ\r\n"
			+ "fgYhAB5V583U+HtgnoIYqENRSpOV76qVGJon/q41AoGBAMrXIyN1jbEKNgo/BKFw\r\n"
			+ "iMDa79MF4BB5HNs1gIVpIusKDtIIZYOw49CR7IbT8o5Ds2PhopyfO8H+vqisZ4dh\r\n"
			+ "37zpvqcn2lGgZGJt2IOfw9kqhawS+R+WrkbS4tYHM0q3UbqEQ+M9AP9tlCWHE64u\r\n"
			+ "/WiKJKsnHrd+4evGr8aDQN9dAoGAEVgLgk6IE8XhYMYP3bfBqqEIWxC4SCfJyERB\r\n"
			+ "qc+9mW6RnAS2PLGrmz8leihvJudEtErArHHco+TlIxBTdv9FU2WB3i4+ui6mkGK5\r\n"
			+ "vKOuiAx1ci7sfwb/4YR91rnIollza2MmjWIPHG12Ps0CQTq+Q3O59yqmrkpQBu+J\r\n"
			+ "wLkeizECgYAlU20v2IxThYGfKKgHMN7Q7Cyo0DugBag8Za4Aso7nWqyllindkBfF\r\n"
			+ "+H7PpyfnJ8tw42F1OV4e4eUWMi2fHQku4JP8cNu9fFYJo17d+3JxDZWy/naaJDeq\r\n"
			+ "Yt6+UaTfX+SH9Kil8LnckWZ/+V4zDrLaxdwLTtuwzm5aKzGAi4JvfA==\r\n"
			+ "-----END RSA PRIVATE KEY-----";
	
	public static final String RSA_PUBLICA = "-----BEGIN PUBLIC KEY-----\r\n"
			+ "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtjLoGb/pykI+FhZ45U+f\r\n"
			+ "MR8MXUtPltVC2CeODulIiSCBjUuBLJHxjOtbRw+K0ENUzvfoSXQkadmA7oijLEP7\r\n"
			+ "PLMztsO+RVp/foPZTED6IITisBch9K/u7pbXNkUyhMLKh82lLvFalRLfwKvuJFLh\r\n"
			+ "SsHad6/snMHdC58ZyXp3WCHhg2hCXwRqUkWPXnmt2LR8wF/8djmzXhu2poH76fxg\r\n"
			+ "cU5+z1pOPuJR33o37S9eOfM4UerpR49ElqgkHvNSJX2n+vUQWach3xVI/Xz2uW7n\r\n"
			+ "/apuuJScrGBBiLBzs2O7tjHRCrdD53CGcLMNeXILGaV8u3VvRX3WsSGV570A8NGV\r\n"
			+ "gQIDAQAB\r\n"
			+ "-----END PUBLIC KEY-----";

}
