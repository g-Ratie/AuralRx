export const getMockHeartRate = async () => {
  const generateMockData = () => {
    const dataPoints = []
    const today = new Date()
    const startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0, 0) // 今日の8時
    const endTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0) // 今日の12時

    for (let time = new Date(startTime); time < endTime; time.setMinutes(time.getMinutes() + 15)) {
      // 60から170の間のランダムな心拍数
      const value = Math.floor(Math.random() * (170 - 60 + 1) + 60)
      dataPoints.push({
        startDate: new Date(time).toISOString(),
        endDate: new Date(time).toISOString(),
        value: value,
      })
    }

    return {
      dataTypeName: 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm',
      points: dataPoints,
    }
  }

  // モックデータを使用
  return generateMockData()
}

export const getMockStep = async () => {
  const generateMockData = () => {
    const dataPoints = []
    const today = new Date()
    const startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0, 0) // 今日の8時
    const endTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0) // 今日の12時

    for (let time = new Date(startTime); time < endTime; time.setMinutes(time.getMinutes() + 15)) {
      // 100から2000の間のランダムな歩数
      const value = Math.floor(Math.random() * (5000 - 100 + 1) + 100)
      dataPoints.push({
        startDate: new Date(time).toISOString(),
        endDate: new Date(time).toISOString(),
        value: value,
      })
    }

    return {
      dataTypeName: 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm',
      points: dataPoints,
    }
  }

  // モックデータを使用
  return generateMockData()
}

export const getMockFitnessData = async () => {
  return {
    heart: await getMockHeartRate(),
    step: await getMockStep(),
  }
}
