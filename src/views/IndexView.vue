<template>
  <div class="box">
    <title-com>
      <div @click="goRouter" class="btn">发布招聘</div>
    </title-com>
    <div class="select-box">
      <div class="search-box">
        <input v-model="select.jobName" type="text" placeholder="实习生招聘" />
        <img @click="getJobList" class="" src="../assets/search.png" alt="" />
      </div>

      <div class="list-box">
        <div class="list" v-for="i in selectKey" :key="i.key">
          <span class="label">{{ i.name }}</span>
          <span :class="{ active: !select[i.inp] }">不限: </span>
          <span
            :class="{ active: select[i.inp] === s }"
            @click="getSelectData(s, i.inp)"
            v-for="(s, index) in options[getKey(i)]"
            :key="index"
            >{{ s }}</span
          >
        </div>
      </div>
    </div>
    <div class="job-list">
      <div v-for="i in jobs" :key="i.id" class="list">
        <div class="left">
          <span class="job-name">{{ i.jobName }}</span>
          <span class="pay-num">{{ i.payMin }}k-{{ i.payMax }}k</span>
          <span class="welfare-box">
            <!-- <i v-for="(item, index) in getWelfare(item.welfare)" :key="index">
              {{ item }}
            </i> -->
            {{ welfare }}
          </span>
        </div>
        <div>
          <span class="job-name">{{ i.workPosition }}</span>
          <span class="job-name">{{ i.publishTime }}</span>
        </div>
        <div class="btn">申请</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted } from 'vue'
import TitleCom from '@/components/TitleComponent.vue'

import { getJob, getRequirement } from '@/http/job'

import { selectKeyOptionInt, Initdata, selectTypeInt } from '@/type/index'

import { useRouter } from 'vue-router'
export default defineComponent({
  components: {
    TitleCom,
  },
  setup() {
    const router = useRouter()

    const data = reactive(new Initdata())

    onMounted(() => {
      getJobList({})
      // getJob({}).then((res: any) => {
      //   data.jobs = res.data
      //   console.log(res)
      // })
      getRequirement().then((res: any) => {
        data.options = res.data
        console.log(res)
        console.log('数据拿到了')
      })
    })

    const selectKey: Array<selectKeyOptionInt> = [
      {
        key: 'WorkingYears',
        name: '工作经验',
        inp: 'workingYear',
      },
      {
        key: 'PayFilter',
        name: '薪资范围',
        inp: 'payArea',
      },
      {
        key: 'PayMonths',
        name: '一年几薪',
        inp: 'payMonth',
      },
    ]

    const getKey = (o: selectKeyOptionInt): keyof typeof data.options => {
      const k: string = o.key
      return k as any
    }
    const getWelfare = (str: string): string[] => {
      return str.split(',')
    }

    const getSelectData = (str: string, type: string): void => {
      // const sk: keyof selectTypeInt = type as keyof selectTypeInt
      // const v: never = str as never
      // data.select[sk] = v
      data.select[type] = str
      console.log(data.select)
      getJobList(data.select)
    }

    const getJobList = (httpData: any): void => {
      getJob(httpData).then((res: any) => {
        data.jobs = res.data
        console.log('数据拿到了')
      })
    }

    const goRouter = () => {
      router.push('/release')
    }
    return {
      ...toRefs(data),
      selectKey,
      getKey,
      getWelfare,
      getJobList,
      goRouter,
      getSelectData,
    }
  },
})
</script>

<style lang="scss" scoped>
.btn {
  font-size: 18px;
  font-weight: 600;
  color: cadetblue;
  border: 1px solid cadetblue;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
}
.box {
  width: 1000px;
  margin: 0 auto;
  box-shadow: 0 6px 18px #999;
}
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #999;
  cursor: pointer;
  padding: 0 20px;
  margin: 35px;
  border-radius: 20px;
  input {
    border: none;
    outline: none;
    margin-right: 10px;
  }
  img {
    height: 40px;
  }
}
.list-box {
  padding: 20px 0px;
  .list {
    margin-top: 10px;
    span {
      margin-right: 5px;
      cursor: pointer;
      &.active {
        color: cadetblue;
      }
    }
    .label {
      color: #999;
      margin-right: 3px;
    }
  }
}

.job-list {
  padding: 10px;
  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 10px;
    border-bottom: 1px solid #efefef;
    font-size: 14px;
    > div {
      display: flex;
      flex-direction: column;
      &.btn {
        // height: 20px;
        // line-height: 20px;
        // text-align: center;
        // width: 70px;
        // color: #fff;
        // background: cadetblue;
      }
      span {
        padding: 5px;
      }
    }
    .job-name {
      font-weight: 600;
      font-size: 16px;
    }
    .pay-num {
      color: burlywood;
      font-weight: 400;
    }
    .welfare-box {
      display: flex;
      font {
        background: #efefef;
        padding: 5px;
        font-size: 13px;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
    .btn {
      clear: both;
      height: 20px;
      line-height: 20px;
      text-align: center;
      width: 70px;
      color: #fff;
      background: cadetblue;
    }
  }
}
</style>
