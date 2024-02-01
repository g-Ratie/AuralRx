import useSWR from 'swr'
import { FitnessOutput } from '../LLM/fitnessOutputSchema'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useFitnessData = () => {
  const { data, error } = useSWR<FitnessOutput>('/api/fitness/mock', fetcher, {
    revalidateOnFocus: false,
  })
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
