import { RecommendationSongList } from '@/app/api/spotify/recommend/route'
import { FitnessOutput } from '@/common/LLM/fitnessOutputSchema'
import { useState } from 'react'
import { CreatePlaylistButton } from './CreatePlaylistButton'
import { FetchRecommendationsButton } from './FetchRecommendationsButton'

const ButtonsParentClient = ({ fitnessData }: { fitnessData: FitnessOutput }) => {
  const [recommendSongData, setRecommendSongData] = useState<RecommendationSongList | null>(null)

  return (
    <div>
      <FetchRecommendationsButton
        fitnessData={fitnessData}
        onRecommendationsFetched={setRecommendSongData}
      />
      {recommendSongData && <CreatePlaylistButton recommendSongData={recommendSongData} />}
    </div>
  )
}

export default ButtonsParentClient
