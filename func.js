var M = 10000,v_max = 10, t0 = 0, t1 = 45, t2 = 450, t3 = 495, t4 = 945, t5 = 990, t6 = 1395, t7 = 1440, step=15,tt=705;

function velocity_middle(M,v_max,t0,t1,t2,t3,t4,t5,t6,t7) {

    var temp;
    var d1 = t1 - t0;
    var d2 = t3 - t2;
    var d3 = t5 - t4;
    var d4 = t7 - t6;
    temp = M / (1440 - (d1 + d2 + d3 + d4));
    //console.log(temp);
    return temp;
}

var v_mid=velocity_middle(M,v_max,t0,t1,t2,t3,t4,t5,t6,t7);
var n=1440/step;

function check_velocity(v_max,v_mid ){
    if (v_mid > v_max) return 1;
    else return 0;
}

// x_et,  y_et - массивы
function etalon_coords(M,t0,t1,t2,t3,t4,t5,t6,t7,step,n,v_mid,x_et,y_et){
    var d1 = t1 - t0;
    var d2 = t3 - t2;
    var d3 = t5 - t4;
    x_et[0] = t0; y_et[0] = 0;
    for (var i = 1; i <= n; i++)
    {
        x_et[i] = x_et[i - 1] + step;
        //если попадаем во время простоев, то остаётся константа
        if (((x_et[i] > t0) && (x_et[i] < t1)) || ((x_et[i] > t2) && (x_et[i] < t3)) || ((x_et[i] > t4) && (x_et[i] < t5)) || ((x_et[i] > t6) && (x_et[i] <= t7)))
        {
            y_et[i] = y_et[i - 1];
        }

        if ((x_et[i] >= t1) && (x_et[i] <= t2)) y_et[i] = v_mid*(x_et[i] - d1);
        if ((x_et[i] >= t3) && (x_et[i] <= t4)) y_et[i] = v_mid*(x_et[i] - d1 - d2);
        if ((x_et[i] >= t5) && (x_et[i] <= t6)) y_et[i] = v_mid*(x_et[i] - d1 - d2 - d3);
        //y_et[n] = M;

    }
    //console.log(x_et);
    //console.log(y_et);
}

//etalon_coords(5000,40,60,130,250,560,630,890,1000,15,97,4,[],[]);
// x_model,  y_model - массивы
function simulated_coords(t0,t1,  t2,  t3,  t4,  t5,  t6,  t7,  n,  step,  v_mid,  v_max,  x_model,  y_model){
    x_model[0] = t0; y_model[0] = 0;
    var i, last_value = v_mid*step;
    var first_value = step;
    var v, v_up;
    for (i = 1; i <= n; i++)
    {
        //srand(time(0));
        x_model[i] = x_model[i - 1] + step;
        //если попадаем во время простоев, то остаётся константа
        if (((x_model[i] > t0) && (x_model[i] < t1)) || ((x_model[i] > t2) && (x_model[i] < t3)) || ((x_model[i] > t4) && (x_model[i] < t5)) || ((x_model[i] > t6) && (x_model[i] <= t7)))
        {
            y_model[i] = y_model[i - 1];
        }
        else
        {
            y_model[i] = y_model[i - 1] + first_value + Math.random()*( last_value - 0);//обычное рандомное вычисление следующей производительности
            if ((x_model[i] <= t2) && (x_model[i] >= t1))// если попадаем во время работы первой смены
            {	//текущее значение вработки меньше эталонного
                if (y_model[i]<v_mid*(x_model[i] - (t1 - t0)))//необходимо увеличение скорости в узле
                {	//текущая скорость в узле
                    v = (y_model[i] - y_model[i - 1]) / step;
                    //если текущая скорость меньше максимальной то пересчитываем оптимальную скорость, либо увеличиваем до максимума
                    if (v<v_max)
                    {
                        v_up = (v_mid *(x_model[i] - (t1 - t0)) - y_model[i - 1]) / step;
                        //если оптимальная скосрость получается больше максимальной, то увеличиваем до максимума
                        if (v_up>v_max) v_up = v_max;
                    }
                    else v_up = v_max;
                    //корректировка выработки на следующем шаге
                    y_model[i] = y_model[i - 1] + v_up*step;
                }

            }

            if ((x_model[i] <= t4) && (x_model[i] >= t3))//если попадаем во время работы второй смены
            {	//текущее значение вработки меньше эталонного
                if (y_model[i] < v_mid*(x_model[i] - ((t1 - t0) + (t3 - t2))))//необходимо увеличение скорости в узле
                {	//текущая скорость в узле
                    v = (y_model[i] - y_model[i - 1]) / step;
                    //если текущая скорость меньше максимальной то пересчитываем оптимальную скорость, либо увеличиваем до максимума
                    if (v < v_max)
                    {
                        v_up = (v_mid * (x_model[i] - ((t1 - t0) + (t3 - t2))) - y_model[i - 1]) / step;
                        //если оптимальная скосрость получается больше максимальной, то увеличиваем до максимума
                        if (v_up > v_max) v_up = v_max;
                    }
                    else v_up = v_max;
                    //корректировка выработки на следующем шаге
                    y_model[i] = y_model[i - 1] + v_up*step;
                }
            }

            if ((x_model[i] <= t6) && (x_model[i] >= t5))//если попадаем во время работы третьей смены
            {	//текущее значение вработки меньше эталонного
                if (y_model[i] < v_mid*(x_model[i] - ((t1 - t0) + (t3 - t2) + (t5 - t4))))//необходимо увеличение скорости в узле
                {	//текущая скорость в узле
                    v = (y_model[i] - y_model[i - 1]) / step;
                    //если текущая скорость меньше максимальной то пересчитываем оптимальную скорость, либо увеличиваем до максимума
                    if (v < v_max)
                    {
                        v_up = (v_mid * (x_model[i] - ((t1 - t0) + (t3 - t2) + (t5 - t4))) - y_model[i - 1]) / step;
                        //если оптимальная скосрость получается больше максимальной, то увеличиваем до максимума
                        if (v_up > v_max) v_up = v_max;
                    }
                    else v_up = v_max;
                    //корректировка выработки на следующем шаге
                    y_model[i] = y_model[i - 1] + v_up*step;
                }
            }

        }
    }
}

function correction_production( M_act,  t, M,  t0,  t1,  t2,  t3,  t4,  t5,  t6,  t7,  v_max,  v_mid,  step, n,  v_up,  dM, y_pro){
    //console.log(v_up,  dM);
    var v, v_pro;

    var k = t/step;
    //console.log(t);
    //console.log(k);
    var d1 = t1 - t0;
    var d2 = t3 - t2;
    var d3 = t5 - t4;
    var d4 = t7 - t6;
    //если попадаем в первый простой
    if  ((t >= t0) && (t < t1))
    {
        v_pro = (M - M_act) / (1440 - t - (t1 - t) - d2 - d3 - d4);
        dM = 0.0 ;
        if  (M_act<dM)
        {
            dM -= M_act, v_up = 0.0 ;
        }
        else { dM = 0.0; v_up = 0.0 ; }
    }

    //если попадаем во второй простой
    if  ((t > t2) && (t < t3))
    {
        v_pro = (M - M_act) / (1440 - t - (t3 - t) - d3 - d4);
        dM = v_mid*(t - (t1 - t0));
        if  (M_act<dM)
        {
            dM -= M_act, v_up = 0.0 ;
        }
        else { dM = 0.0 ; v_up = 0.0 ; }
    }

    //если попадаем в третий простой
    if  ((t > t4) && (t < t5))
    {
        v_pro = (M - M_act) / (1440 - t - (t5 - t) - d4);
        dM = v_mid*(t - ((t1 - t0) + (t3 - t2)));
        if  (M_act<dM)
        {
            dM -= M_act, v_up = 0.0 ;
        }
        else { dM = 0.0 ; v_up = 0.0 ; }
    }

    //если попадаем в четвёртый простой
    if  ((t > t6) && (t <= t7))
    {
        v_pro = 0;//уже не работаем
        dM = v_mid*(t - ((t1 - t0) + (t3 - t2) + (t5 - t4)));
        if  (M_act<dM)
        {
            dM -= M_act, v_up = 0.0 ;
        }
        else { dM = 0.0 ; v_up = 0.0 ; }
    }

    // если попадаем во время работы первой смены
    if  ((t <= t2) && (t >= t1))
    {
        v_pro = (M - M_act) / (1440 - t - d2 - d3 - d4);
        //текущее значение вработки меньше эталонного
        dM = v_mid*(t - (t1 - t0));
        //текущая скорость в узле
        v = M_act / (t - (t1 - t0));
        if  (M_act<dM)//необходимо увеличение скорости в узле
        {	//если текущая скорость меньше максимальной то пересчитываем оптимальную скорость, либо увеличиваем до максимума
            if  (v<v_max)
            {
                v_up = (v_mid *(t + step - (t1 - t0)) - M_act) / step;
                //если оптимальная скосрость получается больше максимальной, то увеличиваем до максимума
                if  (v_up>v_max) v_up = v_max;
            }
            else v_up = v_max;
            //разница выработки на текущем шаге
            dM -= M_act;
        }
        else
        {
            dM = 0.0 ; v_up = 0.0 ;
        }
    }

    //если попадаем во время работы второй смены
    if  ((t <= t4) && (t >= t3))
    {
        v_pro = (M - M_act) / (1440 - t - d3 - d4);
        //текущее значение вработки меньше эталонного
        dM = v_mid*(t - ((t1 - t0) + (t3 - t2)));
        //текущая скорость в узле
        v = M_act / (t - ((t1 - t0) + (t3 - t2)));
        if  (M_act<dM)//необходимо увеличение скорости в узле
        {	//если текущая скорость меньше максимальной то пересчитываем оптимальную скорость, либо увеличиваем до максимума
            if  (v<v_max)
            {
                v_up = (v_mid *(t + step - ((t1 - t0) + (t3 - t2))) - M_act) / step;
                //если оптимальная скосрость получается больше максимальной, то увеличиваем до максимума
                if  (v_up>v_max) v_up = v_max;
            }
            else v_up = v_max;
            //разница выработки на текущем шаге
            dM -= M_act;
        }
        else
        {
            dM = 0.0 ; v_up = 0.0 ;
        }
    }

    //если попадаем во время работы третьей смены
    if  ((t <= t6) && (t >= t5))
    {
        v_pro = (M - M_act) / (1440 - t - d4);
        //текущее значение вработки меньше эталонного
        dM = v_mid*(t - ((t1 - t0) + (t3 - t2) + (t5 - t4)));
        //текущая скорость в узле
        v = M_act / (t - ((t1 - t0) + (t3 - t2) + (t5 - t4)));
        if  (M_act<dM)//необходимо увеличение скорости в узле
        {	//если текущая скорость меньше максимальной то пересчитываем оптимальную скорость, либо увеличиваем до максимума
            if  (v<v_max)
            {
                v_up = (v_mid *(t + step - ((t1 - t0) + (t3 - t2) + (t5 - t4))) - M_act) / step;
                //если оптимальная скосрость получается больше максимальной, то увеличиваем до максимума
                if  (v_up>v_max) v_up = v_max;
            }
            else v_up = v_max;
            //разница выработки на текущем шаге
            dM -= M_act;
        }
        else
        {
            dM = 0.0 ; v_up = 0.0 ;
        }
    }

    if  (v_pro>v_max) v_pro = v_max;
    y_pro[k] = M_act;
    //console.log(y_pro[k]);
    for (var i = k + 1; i <= n; i++)//цикл для вичисления координат "хвоста" эталона, начиная с текущего момента
    {
        t += step;
        if  (((t > t0) && (t <= t1)) || ((t > t2) && (t <= t3)) || ((t > t4) && (t <= t5)) || ((t > t6) && (t <= t7)))
        {
            y_pro[i] = y_pro[i - 1];
        }
        if ((t > t1) && (t <= t2)) y_pro[i] = y_pro[i - 1] + v_pro*step;
        if ((t > t3) && (t <= t4)) y_pro[i] = y_pro[i - 1] + v_pro*step;
        if ((t > t5) && (t <= t6)) y_pro[i] = y_pro[i - 1] + v_pro*step;
        //else y_pro[i] = y_pro[i - 1] + v_pro*step;
        //if (y_pro[i]>M) y_pro[i]=M;
        //console.log(dM, );
    }
    console.log(v_up,  dM);
    var res_str3 = '{'+ '\"' + dM + '\":\"' + v_pro + '\"}';

    //console.log(res_str3);
    return res_str3;
    //return y_pro[i];
}



//correction_production( 2000,  120,  40,60,130,250,560,630,890,1000,  10000,  4000,  15,  0.0,  0.0);

module.exports.velocity_middle = velocity_middle;
module.exports.etalon_coords = etalon_coords;
module.exports.simulated_coords = simulated_coords;
module.exports.correction_production = correction_production;