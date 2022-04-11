<template>
  <div>
    <title-com>
      <div @click="goRouter" class="btn">招聘广场</div>
    </title-com>
    <div class="release-box">
      <h2 class="text-title">发布招聘</h2>

      <div class="inp-box">
        <div class="list">
          <span class="label">职位名称</span>
          <input v-model="JobInData.jobName" type="text" placeholder="请输入" />
        </div>
        <div class="list">
          <span class="label">学历要求</span>
          <select
            v-model="JobInData.education"
            placeholder="请选择"
            name=""
            id=""
          >
            <option value="">请选择</option>
            <option
              v-for="(item, index) in selectOptions.Education"
              :key="index"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>
        <div class="list">
          <span class="label">经验要求</span>
          <select
            v-model="JobInData.workingYears"
            placeholder="请选择"
            name=""
            id=""
          >
            <option value="">请选择</option>
            <option
              v-for="(item, index) in selectOptions.WorkingYears"
              :key="index"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>
        <div class="list">
          <span class="label">工资最低值</span>
          <select v-model="JobInData.payMin" placeholder="请选择" name="" id="">
            <option value="">请选择</option>
            <option
              v-for="(item, index) in selectOptions.PayMin"
              :key="index"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>
        <div class="list">
          <span class="label">工资最高值</span>
          <select v-model="JobInData.payMax" placeholder="请选择" name="" id="">
            <option value="">请选择</option>
            <option
              v-for="(item, index) in selectOptions.PayMax"
              :key="index"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>
        <div class="list">
          <span class="label">薪次</span>
          <select
            v-model="JobInData.payMonth"
            placeholder="请选择"
            name=""
            id=""
          >
            <option value="">请选择</option>
            <option
              v-for="(item, index) in selectOptions.PayMonths"
              :key="index"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>
        <div class="list">
          <span class="label">福利待遇</span>
          <label v-for="(item, index) in selectOptions.Welfares" :key="index">
            <input
              v-model="JobInData.welfare"
              type="checkbox"
              :value="item"
            />{{ item }}
          </label>
        </div>
        <div class="list">
          <span class="label">工作地点</span>
          <select
            class="id-select"
            v-model="JobInData.cityId"
            placeholder="请选择"
            name=""
            id=""
          >
            <option value="0">请选择</option>
            <option
              v-for="(item, index) in selectOptions.City"
              :key="index"
              :value="item.id"
            >
              {{ item.name }}
            </option>
          </select>
          <select
            class="id-select"
            v-model="JobInData.areaId"
            placeholder="请选择"
            name=""
            id=""
          >
            <option value="0">请选择</option>
            <option
              v-for="(item, index) in selectOptions.Area"
              :key="index"
              :value="item.id"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="list">
          <span class="label">招聘企业：</span>
          <select
            v-model="JobInData.companyId"
            placeholder="请选择"
            name=""
            id=""
          >
            <option value="0">请选择</option>
            <option
              v-for="(item, index) in selectOptions.Company"
              :key="index"
              :value="item.id"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      <div @click="sunfun" class="sub-btn">发布招聘</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted } from 'vue'
import TitleCom from '@/components/TitleComponent.vue'
import { getRequirement, postJob } from '@/http/job'
import { useRouter } from 'vue-router'
import { Initdata } from '@/type/release'

export default defineComponent({
  components: {
    TitleCom,
  },
  setup() {
    const router = useRouter()
    const goRouter = () => {
      router.push('/index')
    }

    const data = reactive(new Initdata())
    onMounted(() => {
      getRequirement().then((res: any) => {
        data.selectOptions = { ...data.selectOptions, ...res.data }
      })
    })

    const sunfun = () => {
      console.log(data.JobInData)
      let key: keyof typeof data.JobInData
      for (key in data.JobInData) {
        if (!data.JobInData[key]) {
          alert('请先完善信息')
          return
        }
      }

      // const httpData: any = { ...data.JobInData }
      // data.JobInData.welfare.forEach((v) => {
      //   httpData.welfare += v + ','
      // })
      // console.log(httpData)

      postJob({
        ...data.JobInData,
        welfare: data.JobInData.welfare.join(','),
      }).then((res: any) => {
        console.log(res)
        alert('发布成功')
      })
    }
    return {
      ...toRefs(data),
      goRouter,
      sunfun,
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
.text-title {
  padding: 5px 10px;
  border-bottom: 2px solid cadetblue;
  color: cadetblue;
}
.release-box {
  padding: 20px 40px;
}
.inp-box {
  display: flex;
  flex-direction: column;
  .list {
    margin-bottom: 15px;
    select,
    .job-name {
      width: 200px;
    }
    .id-select {
      width: 100px;
    }
  }
  .label {
    display: inline-block;
    width: 100px;
  }
}
.sub-btn {
  width: 200px;
  background: cadetblue;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  border-radius: 10px;
}
</style>
