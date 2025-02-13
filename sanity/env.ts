export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-11'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  "skekFVF6yoGEwCgVIvnOS4FHuCTmjmvcnATl3fWGe7A98VkC3kND4KrUvgS6KMUJVvVYYo0nPtClkOC49wUASENnG0XxEll1lQNHpHCFsgLB7gvYGDovkOlJHupFvNpoNV0ED3aV80V3eqKun9gLAoMtdTccOHJY3ZSM1k1z13CGmYV8ey5c", 
   'Missing environment variable:NEXT_PUBLIC_SANITY_API_TOKEN'
)
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
