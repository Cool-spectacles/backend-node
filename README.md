# ePass Backend API-v1

### Authentication
* [x] Server Created.
* [ ] Registration,
* [ ] Reg_verify,
* [ ] Login,
* [ ] Change_Pass.
---

### Pass_CRE
* [ ] Candi_detail,
* [ ] Pass_Scheme,
* [ ] Candi_Detail_Verify(depot),
* [ ] Gen_wait.
---

### PAY
* [ ] Redirectto_pay_gateway(student,institute),
* [ ] Pay_verify(depot).
---

### Pass_GEN
* [ ] Candi_Pay(clear)_Pass_Gen,
* [ ] Candi_Pay(Pen)_Pass_notGen.
---

### Pass_Expire
* [ ] Candi(end_date)_record,
* [ ] Time_limitcross(inform_candi).
---

### DEV_OPPS
* [ ] Registration_logs,
* [ ] verify_logs,
* [ ] Pass_change_logs,
* [ ] Pass_Scheme_logs.
* [ ] Candi_Detail_Verify(depot)_logs,
* [ ] Pay_Gateway_logs,
* [ ] Pass_Gen_logs,
* [ ] Pass_Expire_logs.
---

## Routes

| Method | URI | Middleware |
| :-----: | :---- | :-----:|
| POST | /v1/simple | |
| GET | /v1/auth/signup | |


