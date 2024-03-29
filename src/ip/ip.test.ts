import { IPAddress } from "./ip"

describe("IPAddress", () => {
  it("should create an ipv4 IPAddress object", () => {
    const ip = IPAddress.parse("127.0.0.1")
    expect(ip.version).toBe("v4")
  })

  it("should create an ipv6 IPAddress object", () => {
    const ip = IPAddress.parse("::1")
    expect(ip.version).toBe("v6")
    expect(ip.toInt()).toBe(1n)
  })

  it("to byte array ipv4", () => {
    const ip = IPAddress.parse("127.0.0.1")
    expect(ip.toByteArray()).toStrictEqual([127, 0, 0, 1])
  })

  it("to byte array ipv6", () => {
    const ip = IPAddress.parse("::1")
    expect(ip.toByteArray()).toStrictEqual([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    ])
  })

  it("to byte array ipv4 broadcast", () => {
    const ip = IPAddress.parse("255.255.255.255")
    expect(ip.toByteArray()).toStrictEqual([0xff, 0xff, 0xff, 0xff])
  })

  it("ipv4 to octets", () => {
    const ip = IPAddress.parse("255.255.255.255")
    expect(ip.octets).toStrictEqual(["255", "255", "255", "255"])
  })

  it("to byte array ipv4 software address", () => {
    const ip = IPAddress.parse("0.0.0.0")
    expect(ip.toByteArray()).toStrictEqual([0x00, 0x00, 0x00, 0x00])
  })

  it("should create an software ipv6 IPAddress object", () => {
    const ip = IPAddress.parse("::")
    expect(ip.version).toBe("v6")
    expect(ip.toInt()).toBe(0n)
  })

  it("should return the ip address in string format", () => {
    const ip = IPAddress.parse("127.0.0.1")
    expect(ip.toString()).toBe("127.0.0.1")
  })

  it("ipv4 private address families", () => {
    let ip = IPAddress.parse("192.168.0.1")
    expect(ip.getIPAddressType()).toBe("Private")

    ip = IPAddress.parse("192.168.1.10")
    expect(ip.getIPAddressType()).toBe("Private")

    ip = IPAddress.parse("192.168.255.255")
    expect(ip.getIPAddressType()).toBe("Private")

    ip = IPAddress.parse("10.0.0.0")
    expect(ip.getIPAddressType()).toBe("Private")

    ip = IPAddress.parse("10.10.10.10")
    expect(ip.getIPAddressType()).toBe("Private")

    ip = IPAddress.parse("10.255.255.255")
    expect(ip.getIPAddressType()).toBe("Private")
  })
})

it("ipv6 address families", () => {
  let ip = IPAddress.parse("fdf8:f53b:82e4::53")
  expect(ip.getIPAddressType()).toBe("Private")

  ip = IPAddress.parse("::")
  expect(ip.getIPAddressType()).toBe("Software")

  ip = IPAddress.parse("::1")
  expect(ip.getIPAddressType()).toBe("Loopback")

  ip = IPAddress.parse("::ffff:192.168.0.1")
  expect(ip.getIPAddressType()).toBe("IPV4-Mapped")

  ip = IPAddress.parse("2001:8a0:6b64:6800:7a98:8942:a460:262")
  expect(ip.getIPAddressType()).toBe("Public")

  ip = IPAddress.parse("fe80::532d:f7cd:aed8:6f46")
  expect(ip.getIPAddressType()).toBe("Link-Local")

  ip = IPAddress.parse("2001::4136:e378:8000:63bf:3fff:fdd2")
  expect(ip.getIPAddressType()).toBe("Teredo")

  ip = IPAddress.parse("fdf8:f53b:82e4::53")
  expect(ip.getIPAddressType()).toBe("Private")

  ip = IPAddress.parse("2002:cb0a:3cdd:1::1")
  expect(ip.getIPAddressType()).toBe("6to4")

  ip = IPAddress.parse("2001:10:240:ab::a")
  expect(ip.getIPAddressType()).toBe("Orchid")

  ip = IPAddress.parse("ff01:0:0:0:0:0:0:2")
  expect(ip.getIPAddressType()).toBe("Multicast")

  ip = IPAddress.parse("2001:db8:8:4::2")
  expect(ip.getIPAddressType()).toBe("Documentation")
})
