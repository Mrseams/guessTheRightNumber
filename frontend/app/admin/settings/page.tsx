"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import AdminNavigation from "../components/AdminNavigation"
import { Settings, Save, Database, Shield, Bell } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "TrueNumber Game",
    maxUsers: "1000",
    registrationEnabled: true,
    emailNotifications: true,
    maintenanceMode: false,
    winThreshold: "70",
    winReward: "100",
    loseDeduction: "50",
  })
  const { toast } = useToast()

  const handleSaveSettings = () => {
    // Here you would typically save to your backend
    toast({
      title: "Settings Saved",
      description: "System settings have been updated successfully.",
    })
  }

  const handleInputChange = (key: string, value: string | boolean) => {
    setSettings({ ...settings, [key]: value })
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 text-white">
        <AdminNavigation />

        <main className="container mx-auto px-4 py-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              System Settings
            </h1>
            <p className="text-gray-400">Configure system-wide settings and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* General Settings */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>General Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="siteName" className="text-gray-300">
                    Site Name
                  </Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleInputChange("siteName", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="maxUsers" className="text-gray-300">
                    Maximum Users
                  </Label>
                  <Input
                    id="maxUsers"
                    type="number"
                    value={settings.maxUsers}
                    onChange={(e) => handleInputChange("maxUsers", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="registrationEnabled" className="text-gray-300">
                    Enable User Registration
                  </Label>
                  <Switch
                    id="registrationEnabled"
                    checked={settings.registrationEnabled}
                    onCheckedChange={(checked) => handleInputChange("registrationEnabled", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenanceMode" className="text-gray-300">
                    Maintenance Mode
                  </Label>
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleInputChange("maintenanceMode", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Game Settings */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center space-x-2">
                  <Database className="w-5 h-5" />
                  <span>Game Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="winThreshold" className="text-gray-300">
                    Win Threshold
                  </Label>
                  <Input
                    id="winThreshold"
                    type="number"
                    value={settings.winThreshold}
                    onChange={(e) => handleInputChange("winThreshold", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <p className="text-sm text-gray-400 mt-1">Numbers above this value win</p>
                </div>
                <div>
                  <Label htmlFor="winReward" className="text-gray-300">
                    Win Reward (coins)
                  </Label>
                  <Input
                    id="winReward"
                    type="number"
                    value={settings.winReward}
                    onChange={(e) => handleInputChange("winReward", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="loseDeduction" className="text-gray-300">
                    Lose Deduction (coins)
                  </Label>
                  <Input
                    id="loseDeduction"
                    type="number"
                    value={settings.loseDeduction}
                    onChange={(e) => handleInputChange("loseDeduction", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Security Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNotifications" className="text-gray-300">
                    Email Notifications
                  </Label>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                  />
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Security Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">JWT Token Expiry</span>
                      <span className="text-green-400">7 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Password Encryption</span>
                      <span className="text-green-400">Enabled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Rate Limiting</span>
                      <span className="text-green-400">Active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h4 className="text-white font-medium mb-2">System Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Server Status</span>
                      <span className="text-green-400">Online</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Database</span>
                      <span className="text-green-400">Connected</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Last Backup</span>
                      <span className="text-gray-300">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSaveSettings}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold px-8 py-2"
            >
              <Save className="w-4 h-4 mr-2" />
              Save All Settings
            </Button>
          </div>
        </main>

        <Toaster />
      </div>
    </ProtectedRoute>
  )
}
