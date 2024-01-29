import { SpotifyApi } from '@spotify/web-api-ts-sdk'

export const play = async (spotifyClient: SpotifyApi, deviceId: string) => {
  return await spotifyClient.player.startResumePlayback(deviceId)
}

export const pause = async (spotifyClient: SpotifyApi, deviceId: string) => {
  return await spotifyClient.player.pausePlayback(deviceId)
}

export const getDeviceList = async (spotifyClient: SpotifyApi) => {
  return await spotifyClient.player.getAvailableDevices()
}

export const getDevice = async (spotifyClient: SpotifyApi, name: string) => {
  const availableDevices = await spotifyClient.player.getAvailableDevices()
  const device = availableDevices.devices.find((device) => device.name === name)
  return device
}
