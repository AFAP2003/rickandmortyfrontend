import * as yup from 'yup'

export const locationSchema = yup.object({
  locationName: yup
    .string()
    .required('Location name is required')
    .min(3, 'Location name must be at least 3 characters')
    .max(50, 'Location name must be less than 50 characters')
    .trim()
})