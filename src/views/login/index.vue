<template>
  <div class="login-wrapper">
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="用户名" name="username">
        <a-input v-model:value="form.username"></a-input>
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input type="password" v-model:value="form.password"></a-input>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="handleLogin">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Form, Input, Button, message } from 'ant-design-vue';
import { ILoginParams } from '@/typings';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    [Button.name]: Button,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const formRef = ref();

    const form = reactive({
      username: '',
      password: '',
    });

    const rules = {
      username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    };

    const handleLogin = () => {
      formRef.value.validate().then(() => {
        const data: ILoginParams = form;
        store.dispatch('login', data).then(() => {
          message.success('登录成功', () => {
            router.push('/');
          });
        });
      });
    };

    return {
      formRef,
      form,
      rules,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      handleLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-wrapper {
  width: 500px;
  margin: 10% auto 0;
}
</style>
