import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Here you would typically validate against your database
    // For demo purposes, we'll simulate a successful login
    // Replace this with your actual authentication logic

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful response (replace with actual API call)
    if (email === "demo@truenumber.com" && password === "demo123") {
      const mockResponse = {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4N2U0ZDYxYTJkZGJmMGRkYmUyY2NkNSIsInJvbGUiOiJjbGllbnQiLCJlbWFpbCI6ImRlbW9AdHJ1ZW51bWJlci5jb20iLCJpYXQiOjE3NTMxMDg0MTUsImV4cCI6MTc1MzcxMzIxNX0.QvLRShqQ9LziXCKQk3GejsV5-tvQJxRczm1OwKP7hlY",
        user: {
          id: "687e4d61a2ddbf0ddbe2ccd5",
          username: "demo_user",
          role: "client",
        },
      }

      return NextResponse.json(mockResponse)
    }

    // For other credentials, simulate API call to your backend
    const response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ message: data.message || "Invalid credentials" }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
