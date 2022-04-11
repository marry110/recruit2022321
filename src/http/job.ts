import $http from './index'
export function getJob(data: any): any {
  return $http({
    url: '/Job',
    method: 'get',
    params: data,
  })
}

export function postJob(data: any): any {
  return $http({
    url: '/Job',
    method: 'post',
    data,
  })
}

export function putJob(): any {
  return $http({
    url: '/Job',
    method: 'put',
  })
}

export function getRequirement(): any {
  return $http({
    url: '/Requirement',
    method: 'get',
  })
}
