<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm">
                    <h1>Hello</h1>
                    <h2>网上书店管理系统</h2>
                    <el-form-item>
                        <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password" prefix-icon="el-icon-lock" v-model="loginForm.password"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="success" size="default"
                            @click="login">登录</el-button>
                        <div class="btn_space"></div>
                        <el-popover placement="bottom" title="Welcome Our Bookstore" width="200" trigger="hover"
                            content="享受无缝的购物体验，发现阅读的乐趣">
                            <el-button slot="reference" class="login_btn" type="primary" size="default"
                                @click="registerButton">注册</el-button>
                        </el-popover>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-dialog title="欢迎注册" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                <el-form-item label="用户名" prop="userName" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.userName" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off">
                    </el-input>
                </el-form-item>

                <el-form-item label="真实姓名" prop="realName" :label-width="formLabelWidth">
                    <el-input v-model.trim="ruleForm.realName" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                    <el-input v-model.trim="ruleForm.email" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="地址" prop="address" :label-width="formLabelWidth">
                    <el-input v-model.trim="ruleForm.address" autocomplete="off"></el-input>

                </el-form-item>

                <el-form-item label="电话号码" prop="phoneNumber" :label-width="formLabelWidth">
                    <el-input v-model.trim="ruleForm.phoneNumber" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="余额" prop="balance" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.balance" autocomplete="off" :disabled="true" placeholder="0"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="register('ruleForm')">注册</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',
    data() {
        var validateRealName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入真实姓名'));
            } else {
                callback();
            }
        };

        var validateEmail = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入邮箱'));
            } else {
                if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
                    callback(new Error('邮箱格式不正确'));
                } else {
                    callback();
                }
            }
        };

        var validateAddress = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入地址'));
            } else {
                callback();
            }
        };

        var validatePhoneNumber = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入电话号码'));
            } else {
                if (!/^[0-9]{11}$/.test(value)) {
                    callback(new Error('电话号码格式不正确'));
                } else {
                    callback();
                }
            }
        };
        return {
            loginForm: {
                username: 'test2',
                password: 'lisi456'
            },
            loading: false,
            dialogFormVisible: false,
            formLabelWidth: '120px',
            ruleForm: {
                userId: '',
                userName: '',
                password: '',
                realName: '',
                email: '',
                address: '',
                phoneNumber: '',
                balance: 0
            },
            rules: {
                realName: [
                    { validator: validateRealName, trigger: 'blur' }
                ],
                email: [
                    { validator: validateEmail, trigger: 'blur' }
                ],
                address: [
                    { validator: validateAddress, trigger: 'blur' }
                ],
                phoneNumber: [
                    { validator: validatePhoneNumber, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        login() {
            axios({
                method: 'get',
                url: `http://localhost:3919/serve8080/login?userName=${this.loginForm.username}`,
            }).then(res => {
                this.loading = true
                if (res.data === '') {
                    this.$message({
                        message: '用户名不存在-请先注册',
                        type: 'error'
                    })
                } else {
                    if (res.data.password === this.loginForm.password) {
                        // 保存用户信息到 vuex 的 user
                        this.$store.commit('userInfo/SAVEUSER', res.data)
                        this.$router.push('/home')
                    } else {
                        this.$message({
                            message: '密码错误',
                            type: 'error'
                        })
                    }
                }
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                this.loading = false
            })
        },
        registerButton() {
            this.dialogFormVisible = true
        },
        register(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios({
                        method: 'post',
                        url: `http://localhost:3919/serve8080/register`,
                        data: {
                            userName: this.ruleForm.userName,
                            password: this.ruleForm.password,
                            realName: this.ruleForm.realName,
                            email: this.ruleForm.email,
                            address: this.ruleForm.address,
                            phoneNumber: this.ruleForm.phoneNumber,
                            balance: this.ruleForm.balance
                        }
                    }).then(res => {
                        if (res.data === 'success') {
                            this.$message({
                                message: '注册成功',
                                type: 'success'
                            })
                            this.$router.push('/login')
                        } else {
                            this.$message({
                                message: res.data+'-注册失败',
                                type: 'error'
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style lang="scss" scoped>
.login_container {
    width: 100%;
    height: 100vh;
    background: url('../assets/images/background.jpg') no-repeat;
    background-size: cover;
    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        left: 100%;
        background: url("../assets/images/login_form.png") no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            font-size: 20px;
            color: white;
            margin: 20px 0px;
        }

        .login_btn {
            display: inline-block;
            width: 45%;
        }

        .btn_space {
            display: inline-block;
            width: 10%;
        }
    }
}
</style>
