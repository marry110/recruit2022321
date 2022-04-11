export interface jobsTypeInt {
  jobName: string
  payMin: string
  payMax: string
  payMonth: string
  welfare: string
  education: string
  workingYears: string
  cityId: string
  areaId: string
  companyId: number
  id: number
  publishTime: number
  workPosition: string
  companyName: string
}

export interface selectInt {
  WorkingYears: string[]
  Welfares: string[]
  PayMonths: string[]
  PayFilter: string[]
}

export interface selectKeyOptionInt {
  key: string
  name: string
  inp: string
}

export interface selectTypeInt {
  jobName: string
  payArea: string
  payMonth: string
  workingYear: string
  [key: string]: any
}

export interface optionTypeInt {
  WorkingYears: string[]
  Welfares: string[]
  PayMonths: string[]
  PayFilter: string[]
}

export class Initdata {
  jobs: Array<jobsTypeInt> = []
  select: selectTypeInt = {
    jobName: '',
    payArea: '',
    payMonth: '',
    workingYear: '',
  }
  options: optionTypeInt = {
    WorkingYears: [],
    Welfares: [],
    PayMonths: [],
    PayFilter: [],
  }
}
