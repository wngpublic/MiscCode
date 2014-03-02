package javaapplication1;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;

public class GeneralAlgorithms {
    HashMap <String, Integer>map;
    int ctr;
    static HashMap<Integer, Integer>hash = new HashMap();
    static Random rand = new Random();
    public static int [] genRandList(int lo, int hi, int sz, boolean isUnique){
        int [] ary          = new int[sz];
        int hExists, val, i;
        hash.clear();
        for(i = 0; i < sz; i++){
            ary[i]          = 0;
        }
        if(((hi-lo+1) < sz) && (isUnique == true)){
            return ary;
        }
        for(i = 0; i < sz; i++){
            hExists         = 0;
            while(hExists == 0){
                val         = random(lo,hi);
                if(isUnique == true){
                    if(hash.containsKey(val) == false){
                        hash.put(val,1);
                        hExists = 1;
                        ary[i]  = val;
                    }
                }
                else {
                    hExists     = 1;
                    ary[i]      = val;
                }
            }
        }
        return ary;
    }
    public static int    random(int lo, int hi){
        int ret             = (int)Math.floor(rand.nextDouble() * (hi-lo) + lo);
        return ret;
    }
    public static void   shuffle(int [] ary){
        int [] used         = new int[ary.length];
        int i, j, r, found;
        int max             = ary.length-1;
        for(i = 0; i < ary.length; i++){
            used[i]         = 0;
        }
        for(i = 0; i < ary.length; i++){
            found           = 0;
            while(found == 0 && used[i] == 0){
                r           = random(i, max);
                if(used[r] == 0){
                    found   = 1;
                    swap(ary, i, r);
                    used[i] = 1;
                    used[r] = 1;
                }
            }
        }
    }
    public static void   swap(int [] ary, int i, int j){
        int tmp             = ary[j];
        ary[j]              = ary[i];
        ary[i]              = tmp;
    }
    public GeneralAlgorithms(){
        map = new HashMap();
        ctr = 0;
    }
    public void resetCtr(){
        ctr = 0;
    }
    public ArrayList combinationSet(Integer []aIn, int choose){
        ArrayList<Integer> aOut = new ArrayList();
        return aOut;
    }
    /**
     * n choose c = n!/(c!(n-c)!)
     * 
     * 12345 choose 2 = (5!)/(2!(5-2)!) = 120/(12) = 10
     * 12,13,14,15
     * 23,24,25
     * 34,35
     * 45
     * 
     * 123456 choose 3 = (6!)/(3!(3!)) = 720/36 = 20
     * 123,124,125,126
     * 134,135,136
     * 145,146
     * 156
     * 234,235,236
     * 245,246
     * 256
     * 345,346
     * 356
     * 456
     * 
     * 328457 choose 4 = (6!)/(4!(2!)) = 720/48 = 15
     * 3284,3285,3287
     * 3245,3247
     * 3257
     * 3845,1847
     * 3857
     * 3457
     * 2845,2847
     * 2857
     * 2457
     * 8457
     */
    public void comb(int []a, int k){
        StringBuilder s = new StringBuilder();
        for(int i = 0; i < a.length; i++){
            
        }
    }
    private int printCheckCombo(int []a, int k, int act){
        int fA  = factorial(a.length);
        int fK  = factorial(k);
        int fAK = factorial(a.length-k);
        int exp = fA / (fK*fAK);
        System.out.println(
                String.format("Combination: %d choose %d = %d!/(%d!(%d-%d)!) = %d/(%d * %d) = %d combinations expected", 
                a.length, k, a.length, k, a.length, k, fA, fK, fAK, exp
        ));
        if(act != exp){
            System.out.println(String.format("Error, act = %d, exp = %d", act, exp));
            return -1;
        }
        System.out.println(String.format("Pass, act = %d, exp = %d", act, exp));                    
        return 0;
    }
    public int combination(int []a, int k){
        int i,j,
            sz = a.length;
        int limit  = sz-k;
        int []u = new int[sz];
        int []z = new int[k];
        for(j = 0; j < sz; j++){
            u[j] = 0;
        }
        for(j = 0; j < k; j++){
            z[j] = j;
        }
        map.clear();
        int act = combination1(a,u,z,k,1);
        return printCheckCombo(a, k, act);
    }
    public int factorial(int v){
        if(v <= 1){
            return 1;
        }
        return (v*factorial(v-1));
    }
    public int printCombination(int []a, int []u, int []z, int k, int ctr){
        StringBuilder sa = new StringBuilder();
        StringBuilder su = new StringBuilder();
        StringBuilder sv = new StringBuilder();
        StringBuilder sz = new StringBuilder();
        int i;
        for(i = 0; i < a.length; i++){
            sa.append(a[i]);
            sa.append(" ");
            su.append(u[i]);
            su.append(" ");
            if(u[i] == 1){
                sv.append(a[i]);
                sv.append(" ");
            }
            if(i < k){
                sz.append(a[z[i]]);
                sz.append(" ");                
            }
        }
        System.out.println(String.format("c: %4d sa(%s) su(%s). sv(%s). sz(%s).", ctr, sa, su, sv, sz));        
        if(map.get(sz.toString()) == null){
            map.put(sz.toString(), 1);
            return 0;
        }
        else {
            System.out.println(String.format("Error: duplicate %s is in map!", sz));
            return -1;
        }
    }
    /**
     * combination without order 
     * (n+k-1)!/(k!)
     * 
     * ie (3+3-1)!/3! = 5!/3! = 20
     * 
     * 
     * 123
     * 312
     * 231
     * 213
     * 321
     * 132
     * 312
     * 
     */
    public void combinationNoOrder(int []a, int k){
        
    }
    public void combination0(int []a, int []u, int []z, int k, int sz){
        printCombination(a,u,z,k,0);
    }
    public boolean incCombIdx(int []a, int []z, int k){
        boolean stop;
        int h,i,j;
        
        if(z[k-1] < a.length){
            return false;
        }
        for(i = k - 1, 
            j = a.length-1, 
            stop = false; 
            i >= 0 && !stop; i--, j--){
            if(z[i] < j){
                stop = true;
            }
        }
        if(stop == false){
            return true;
        }
        i++;
        for(h = i; h < k; h++){
            z[h] = (h == i) ? (z[h]+1) : (z[h-1]+1);
        }
        return false;
    }
    public int combination1(int []a, int []u, int []z, int k, int ctr){
        int sz = a.length;
        boolean res = false;
        if(printCombination(a,u,z,k,ctr) == -1){
            return ctr;
        }
        z[k-1]++;            
        if(z[k-1] == a.length){
            res = incCombIdx(a,z,k);
        }
        if(res == false && ctr < 5000){
            return combination1(a,u,z,k,ctr+1);
        }
        return ctr;
    }
    /**
     * n perm k = n!/(n-k)!
     * 
     * 1234 choose 3 = 4!/1! = 24
     * 123,124
     * 234
     * 213,214
     * 134
     * 312,314
     * 
     * 412,413
     * 
     */
    public void permutation(int []a, int k, int ctr){
        int sz  = a.length;
        int []u = new int[sz];
        int []o = new int[sz];
        int i;
        resetCtr();
        for(i = 0; i < sz; i++){
            u[i] = 0;
        }
        permutation(a,u,o,sz,0);
    }
    private void permutation(int []a, int []u, int []o, int sz, int level){
        for(int i = 0; i < sz; i++){
            if(u[i] == 0){
                o[level] = a[i];
                u[i] = 1;
                permutation(a,u,o,sz,level+1);
                u[i] = 0;
            }
        }
        printPermutation(a,u,o,sz,level);
    }
    private void printPermutation(int []a, int []u, int []o, int sz, int level){
        int i;
        for(i = 0; i < sz; i++){
            if(u[i] == 0){
                return;
            }
        }
        StringBuilder s0 = new StringBuilder();
        StringBuilder s1 = new StringBuilder();
        StringBuilder s2 = new StringBuilder();

        for(i = 0; i < sz; i++){
            s0.append(u[i]);
            s0.append(" ");
            s1.append(o[i]);
            s1.append(" ");
            s2.append(a[i]);
            s2.append(" ");
        }
        System.out.println(
            String.format("perm ctr %05d: a(%s) u(%s) o(%s) sz=%d level=%d", ctr, s2, s0, s1, sz, level)
        );
        ctr++;
    }
}
