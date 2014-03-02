#!/usr/bin/python3
#!/usr/bin/python2.7

# commented 
#!/usr/bin/python3
# commented 

import sys 
import os
import os.path
import getopt
import argparse
import fileinput
import random
import re
import string
import copy
import math
import threading
import collections
import time
import urllib.request as url
 
#-------------------------------------------------------------------------------
G_IVAR                          = 100
G_JVAR                          = 200
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
def helloPrint():
    """ This is a doc string.
        It's stored in __doc__ attribute
    """ 
    print("hello")
def printS(s):
    print("-------------------------------------")
    print(s)
def msg(s):
    print('----- {0}'.format(s))
def printSep():
    print("-------------------------------------")
def printMsgS(preMsg, s):
    print("-------------------------------------")
    print(preMsg)
    print(s)
def printTest():
    s                           = "Hello there"
    printS(s)
#-------------------------------------------------------------------------------
class AlignmentString:
    def __init__(self):
        print('0123456789012345678901234567890123456789')
    def t1(self):
        print('012345678901234567890123456789')
        print('hello'.ljust(30))
        print('hello'.rjust(30))
        print('hello'.center(30))
    def t2(self):
        s0      = 'hello'
        s1      = 'again'
        s2      = 'what\'s new'
        s3      = '%s + %s + %s' % (s0, s1, s2)
        print(s3)
        printf("{0}\n".format(s3))
    def testTuple(self):
        t0      = "brown", "black", "blue", "red", "yellow", "white"
        print(t0)
        print(t0[:1])
        print(t0[1:])
    def testList(self):
        t0      = ["brown", "black", "blue", "red", "yellow", "white"]
        t0.append("green")
        print(t0)
        t0.sort()
        print(t0)
    def prepend(self, prepend=""):
        printf("--------{0}\n".format(prepend))
#-------------------------------------------------------------------------------
# os.path.exists(path), os.path.lexists(path), 
#   getsize(path), isfile(path), isdir(path), islink(path), realpath(path)
#-------------------------------------------------------------------------------
class CFileInput(fileinput.FileInput):
    def __exit__(self):
        print("Exit CFileInput")
    def __enter__(self):
        print("Enter CFileInput")
class CFile:
    def __init__(self):
        print("CFile")
    def getFile(self, msg, file=None, file_must_exist=False):
        x                           = None
        try:
            while file is None:
                x                   = raw_input(msg)
                if file_must_exist == True:
                    if os.path.isfile(x):
                        file        = x
                    else:
                        file        = None
                else:
                    file            = x
        except Exception as e:
            print("{0}".format(e))
        return file
    def read_file(self, fi):
        try:
            hfi                     = open(fi, 'r')
            printf("Opened \"{0}\":\n\n".format(fi))
            for line in hfi:
                printf(line)
            hfi.close()
        except Exception as e:
            print("{0}".format(e))
        finally:
            hfi.close()
    def write_file(self, fo, s):
        try:
            hfo                     = open(fo, 'a')
            hfo.write(s)
            hfo.close()
        except Exception as e:
            print("{0}".format(e))
        finally:
            hfo.close()
    def printCmdLineArgs(self):
        if(len(sys.argv) != 0):
            for a in sys.argv:
                print("argv: {0}".format(a))
        else:
            print("argv: no arguments")
    def tFileAccess(self):
        sf1                         = "tmp.txt"
        f1                          = self.getFile("Enter filename:", sf1)
        self.read_file(f1)
    def big_file_read(self, hfile, chunk_sz=2048):
        while True:
            data = hfile.read(chunk_sz)
            if(not data):
                break
            yield data
    def big_data_process(self, data):
        return
    def open_big_file(self, file):
        try:
            hfile   = open(file, 'r')
            for data in self.big_file_read(hfile):
                self.big_data_process(data)
        except Exception as e:
            print("{0}".format(e))
        finally:
            hfile.close()
    def parse_quote(self, fi):
        # returns ary of quotes
        ret_ary                     = []
        try:
            hfi                     = open(fi, 'r')
            for line in hfi:
                if(line == "\n"):
                    continue
                tmp_ary             = line.split('),(')
                for ary in tmp_ary:
                    ary             = ary.replace('(','')
                    ary             = ary.replace(')','')
                    ary             = ary.replace(';','')
                    tup_ary         = ary.split(',')
                    if(len(tup_ary) == 7):
                        vdate       = tup_ary[0]
                        vclose      = tup_ary[4]
                        vvol        = tup_ary[5]
                        tupval      = (vdate, vclose, vvol)
                        ret_ary.append(tupval)
                    elif(ary == ""):
                        pass
                    else:
                        raise Exception("Exception. Invalid Ary {0}.".format(ary))
        except Exception as e:
            print("{0}".format(e))
        finally:
            hfi.close()
        return ret_ary
    def osTest(self):
        path    = os.environ['PATH']
        print('path is : {0}'.format(path))
    def parse_quote_file_test(self):
        # date, open, high, low, close, volume, ad_close
        #fi                          = "fi_quote_aapl.txt"
        fi                          = "fi_quote_aapl_short.txt"
        qary                        = self.parse_quote(fi)
        for v in qary:
            print("date: {0:13s}; close: {1:8s}; volume: {2:15s}".format(v[0], v[1], v[2]))
    def tArgParse(self):
        # py 2
        # py 2 --opt1 3 4
        # py 2 --opt1 3 4 --opt2 7 # parses out 2 as square arg, 3 as opt1 arg, etc
        # py 2 --opt2 3 4 --opt1 4 --opt4 1.3 --opt3 10
        # py 2 3 --opt2 3 --opt1 4 --opt4 1.3 --opt3 10 --opt5 12
        ap                      = argparse.ArgumentParser()
        ap.add_argument("x", help="x value", type=int)
        ap.add_argument("y", help="y value", type=int)
        ap.add_argument("--opt1", help="display optional arg 1", type=int)
        ap.add_argument("--opt2", help="display optional arg 2")   # defaults to string type
        ap.add_argument("--opt3", help="display optional arg 3", type=int, choices=[10,11,12])
        ap.add_argument("--opt4", help="display optional arg 4", type=float)
        ap.add_argument("--opt5", help="display optional arg 5", required=True)
        try:
            args                = ap.parse_args()
            print("x: %d"%(args.x))
            print("y: %d"%(args.y))
            if(args.opt1):
                print("opt1 printed %d"%args.opt1)
            if(args.opt2):
                print("opt2 printed %s"%args.opt2)          # defaults to string type
            if(args.opt3):
                print("opt3 printed %d"%args.opt3)
            if(args.opt4):
                print("opt4 printed %f"%args.opt4)
            if(args.opt5):
                print("opt5 printed %s"%args.opt5)
        except Exception as e:
            print("{0}".format(e))
        
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
# digits, hexdigits, printable, format, vformat, parse, get_value,
# substitute, 
# capitalize, casefold, center, count, endswith, find, format, format_map,
# index, isalnum, isalpha, isdecimal, isdigit, isidentifier, islower, isnumeric,
# isspace, istitle, isupper, join, ljust, lower, lstrip, partition, replace,
# rfind, rindex, rjust, rsplit, rstrip, split, splitlines, strip, swapcase, 
# title, upper, zfill
#-------------------------------------------------------------------------------
class CStringT:
    s1 = "hello there, \n how     are you? 1 23   456. ok, whatever: whatever1 is:now  980.89102 89i9 bye!\n"
    def __init__(self):
        printf("Instance CStringT\n")
        self.s1 = "why, hello there, \n how     Are you Doing? 1 23   456. ok, whatever: whatever1 is:now  980.89102 89i9 bye!\n"
    def t1(self):
        try:
            v1              = self.s1
            v1              = v1.strip('\n')
            a1              = v1.split(' ')
            printSep()
            printf("line0: {0}\n".format(self.s1))
            printf("line1: {0}\n".format(v1))
            printSep()
            a2              = " ".join(a1)
            printf("line2: {0}\n".format(a2))
            printf("line3: ")
            for token in a1:
                printf("{0}; ".format(token))
            printf("\n")
            printSep()
            v1              = self.s1
            v1              = v1.replace('\n', '')
            v1              = v1.replace("\s+", ' ')
            v2              = re.sub("\s+", ' ', v1)
            v3              = v2.capitalize()
            v4              = v3.upper()
            v5              = v3.lower()
            a1              = v1.split(' ')
            a2              = " ".join(a1)
            printf("line4: {0}\n".format(v1))
            printf("line5: {0}\n".format(a2))
            printf("line6: {0}\n".format(v2))
            printf("line7: {0}\n".format(v3))
            printf("line8: {0}\n".format(v4))
            printf("line9: {0}\n".format(v5))
        except Exception as e:
            printf("Exception {0}".format(e))
    def tSliceTest1(self):
        printSep()
        s1                  = "0123456789"
        printf("0 [:]    : {0}\n".format(s1[:]))
        printf("1 [1:]   : {0}\n".format(s1[1:]))
        printf("2 [1:8]  : {0}\n".format(s1[1:8]))
        printf("3 [::-1] : {0}\n".format(s1[::-1]))
        printf("4 [::-2] : {0}\n".format(s1[::-2]))
        printf("5 [::2]  : {0}\n".format(s1[::2]))
    def tSliceTest2(self):
        printSep()
        s1 = "hEllo There, how     are you? 1 23   456. ok, whatever: whatever1 is:now  980.89102 89i9 bye!"
        printf("0 [:]    : {0}\n".format(s1[:]))
        printf("1 [1:]   : {0}\n".format(s1[1:]))
        printf("2 [1:8]  : {0}\n".format(s1[1:8]))
        printf("3 [::-1] : {0}\n".format(s1[::-1]))
        printf("4 [::-2] : {0}\n".format(s1[::-2]))
        printf("5 [::2]  : {0}\n".format(s1[::2]))
        printf("6 [1:]   : {0}\n".format(s1[1:]))
    def tSliceTest3(self):
        printSep()
        s1                  = "0123456789"
        s2                  = [20,21,22,23,24,25,26,27,28,29,10]
        printSep()
        for v in s1:
            printf("{0}\n".format(v))
        printSep()
        for v in s2:
            printf("{0}\n".format(v))
        printSep()
        for v in s2[::2]:
            printf("{0}\n".format(v))
        printSep()
        for v in s1[1::2]:
            printf("{0}\n".format(v))
        s                   = s1[1:4]
        print("s1[1:4]=%s"%(s))
        s                   = "hello %s how are you doing %d"%("wayne",123)
        print(s)
    def tSliceTest4(self):
        printSep()
        s1                  = [
                                [10,11,12,13,14],
                                [20,21,22,23,24],
                                [30,31,32,33,34],
                                [40,41,42,43,44]
                            ]
        printf("{0}\n".format(s1))
        printSep()
        for v in s1[::]:
            printf("{0}\n".format(v))
    def printFormatTest(self):
        a                           = 123 
        b                           = 2345
        c                           = 123.567
        d                           = 123.32123
        e                           = "Hello there"
        f                           = "yeah yeah yeah"
        g                           = "dude.."
        v_im                        = 3 + 4j
        print("{0:5d}; {1:5.2f}; {2:5.2f}".format(a, c, d))
        print("{0:3s}; {1:3s}".format(g, e))
        print("{0:10s}; {1:3s}".format(g, e))
        print("%d; %d"%(a, c))
        print("{0.real} {0.imag}".format(v_im))
        print("{0:<10}".format(g))      # left justify
        print("{0:>10}".format(g))      # right justify
        print("{0:^10}".format(g))      # center justify
        print("{0:*^10}".format(g))     # center and pad
        print("{0:3}".format(f))        # center and pad
        print("{0:.2%}".format(5/6))
        print("{0:.2%}".format(5.0/6.0))
        print("0x%x"%(a))
        print("%7d"%(a))
        printf("{0:7d}\n".format(a))
        printf("{0:07d}\n".format(a))
        printf("0x{0:x}\n".format(a))
        printf("{0:.1f}\n".format(c))
    def tTitle(self):
        s                           = "hello, my name is wayne"
        s1                          = s.title()
        print(s)   
        print(s1)
    def tJustify(self):
        s                           = "hello, my name is wayne"
        s1                          = s.ljust(30)
        s2                          = s.rjust(30)
        print(s)
        print(s1)
        print(s2)
    def tConvert1(self):
        s                           = "255"
        d                           = 255
        h                           = hex(d)
        print("hex: number 0x%x %d"%(d,d))
        print("hex: string %s"%(h))
        if(s.isdigit()):
            h                       = int(s)
            print("hex: isdigit 0x%x %d"%(h,h))
        else:
            print("hex: is not digit")
    def printfTest(self):
        printf("hello %s. this was written in %d", "wayne", 2012)
        printf("hello %s. this was written in %d with newline\n", "wayne", 2012)
    def setTest(self):
        vset                        = ((1,2),(3,4),(5,6),(7,8))
        printSep()
        for x,y in vset:
            print("set: {0},{1}".format(x, y))
        for sset in vset:
            print("set: {0},{1}".format(sset[0], sset[1]))
    def listTest(self):
        ary                         = []
        ary2                        = []
        for i in range(10):
            ary.append(i+10)
        for i in range(5):
            ary2.append(i+10)
        printS(ary)
        ary.reverse()
        printSep()
        print("range(len(ary)): 10")
        for i in range(len(ary)):
            print("i={0}\tval={1}".format(i, ary[i]))
        ary_sz                      = len(ary)
        for i in range(0, ary_sz, 1):
            print('i={0} val={1}'.format(i, ary[i]))
        ary.sort()
        printS(ary)
        print("index, range")
        for i,v in enumerate(ary):
            print("i={0}\tv={1}".format(i,v))
        sz                          = len(ary)
        print("size is {0}".format(sz))
        for i in xrange(sz):
            ary.pop()
        printS(ary)
        ary                         += ary2
        printMsgS("ary + ary2", ary)
        ary3                        = copy.copy(ary)   # or copy.deepcopy(ary), slower
        printMsgS("ary3 copy of ary", ary3)
        ary                         = [[]]
        ary                         = [[0 for x in xrange(3)] for x in xrange(4)]
        print("i in range(4)")
        for i in range(4):
            for j in range(3):
                ary[i][j]           = i * 10 + j    # must be initialized first
        printMsgS("multiary", ary)
        printSep()
        ary3                        = [3,4,5,6,7,8,9,10,11,12,13]
        printSep()
        print("i in range(2,5)")
        for i in range(2,5):
            printf("range(2,4): {0}={1}\n".format(i, ary3[i]))
        printSep()
        print("print range(0,10,2)")
        for i in range(0,10,2):
            print("i {0}".format(i))
        printSep()
        print("print range(5,0,-1)")
        for i in range(5,0,-1):
            print("i {0}".format(i))
        printSep()
        print("print range(10,0,-2)")
        for i in range(10,0,-2):
            print("i {0}".format(i))
        printSep()
        ary                         = []
        for i in range(5):
            ary.append(i+10)
        print("print ary[::-1]")
        for i in ary[::-1]:
            print("i {0}".format(i))
        printSep()
        print("print reversed(ary)")
        for i in reversed(ary):
            print("i {0}".format(i))
        printSep()
        print("print range(5)")
        for i in range(5):
            print("i {0}".format(i))
        printSep()
        print("print range(5,0,-1)")
        for i in range(5,0,-1):
            print("i {0}".format(i))
        printSep()
        print("print range(5,-1,-1)")
        for i in range(5,-1,-1):
            print("i {0}".format(i))
    def raiseBlock(self):
        raise Exception("my exception")
    def innerCatchBlock(self):
        try:
            self.raiseBlock()
        except Exception as e:
            s                       = "innerException {0}".format(e)
            printS(s)
    def noCatchBlock(self):
        self.raiseBlock()
    def outerCatchBlock(self):
        try:
            self.noCatchBlock()
        except Exception as e:
            s                       = "outerException {0}".format(e)
            printS(s)
    def exceptionTest(self):
        self.innerCatchBlock()
        self.outerCatchBlock()


#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
# compile, search, match, split, findall, sub, subn, purge, groups, pattern
# finditer, expand, group, start, end, span, pos, endpos, lastindex, re, string 
#-------------------------------------------------------------------------------
class CRegEx:
    def __init__(self):
        printf("Instance CRegEx\n")
    def tGroup(self):
        s1  = "hello there, how are you? 1 23 456. ok, whatever: whatever1 is:now  980.89102 89i9 bye!\n"
        s2  = "acgtttccctcaagagggaggtcgtagctaggacgcgcaatg"
        s3  = "acg tttccc tcaa gagg gaggtcgt agctagg acgcg caatg acg"
        #try:
        #except Exception as e:
        #    printf("Exception {0}".format(e))
    def tTokens(self):
        s1  = "hello there, how are you? 1 23 456. ok, whatever: whatever1 is:now  980.89102 89i9 bye!\n"
        printS(s1)
        try:
            line                    = s1.strip('\n')
            ary                     = line.split(' ')
            print(ary)
            isNonAlphaNum           = re.compile(r"\W")
            for token in ary:
                res                 = isNonAlphaNum.search(token)
                if res != None:
                    replace         = re.sub(r"\W","_",token)
                    print("NonAlphaNum: {0}".format(token))
                elif token.isdigit():
                    print("Numeric:     {0}".format(token))
                else:
                    print("Alpha:       {0}".format(token))
        except Exception as e:
            printf("Exception {0}".format(e))
    def regExTest1(self):
        s1                          = "hello there, how are you? 1 23 456. ok, bye!\n"
        printS(s1)
        try:
            line                    = s1.strip('\n')
            ary                     = line.split(' ')
            print(ary)
            matchVal                = re.match("(\w+)\s+(\w+)[,\s]+.*(\d+)\s+(\d+).*", line)
            print("Line is {0}".format(line))
            if matchVal != None:
                print("Matched pattern (\w+)\s+(\w+)[,\s]+.*(\d+)\s+\(\d+).*")
                print("Now groups: {0}, {1}, {2}, {3}".format(matchVal.group(1),  \
                    matchVal.group(2),matchVal.group(3), matchVal.group(4)))   # group(0) is string
            else:
                print("Unmatched pattern (\w+)\s+(\w+)[,\s]+.*(\d+)\s+\(\d+).*")
            matchVal                = re.match("(\w+)\s+(\w+)[\s]+.*(\d+)\s+(\d+).*", line)
            if matchVal != None:
                print("Matched pattern (\w+)\s+(\w+)[,\s]+.*(\d+)\s+\(\d+).*")
                print("Now groups: {0}, {1}, {2}, {3}".format(matchVal.group(1),  \
                    matchVal.group(2),matchVal.group(3), matchVal.group(4)))   # group(0) is string
            else:
                print("Unmatched pattern (\w+)\s+(\w+)[\s]+.*(\d+)\s+\(\d+).*")
            matchVal                = re.search("(\w+)\s+(\w+)[\s]+.*(\d+)\s+(\d+).*", line)
            if matchVal != None:
                print("Search pattern valid (\w+)\s+(\w+)[,\s]+.*(\d+)\s+\(\d+).*")
                print("Now groups: {0}, {1}, {2}, {3}".format(matchVal.group(1),  \
                    matchVal.group(2),matchVal.group(3), matchVal.group(4)))   # group(0) is string
            else:
                print("Search invalid pattern (\w+)\s+(\w+)[\s]+.*(\d+)\s+\(\d+).*")
        except Exception as e:
            print("Exception {0}".format(e))
    def regexTest2(self):
        s1                          = "hello there, how are you? 1 23 456. ok, bye!\n"
        s2                          = "acgtttccctcaagagggaggtcgtagctaggacgcgcaatg"
        try:
            line                    = s1.strip('\n')
            pat                     = "cg"
            for m in re.finditer(pat, s2):
                starti              = m.start()
                endi                = m.end()
                print("Found \"{0}\" at {1:3d}:{2:3d}".format(s2[starti:endi], starti, endi))
        except Exception as e:
            print("Exception {0}".format(e))
    def t3(self):
        s1                          = "hello there, how are you? 1 23 456. ok, bye!\n"
        s2                          = "acgtttccctcaagagggaggtcgtagctaggacgcgcaatg"
        p1                          = re.compile(r"there")
        v                           = []
        v.append(s1.find("there"))          # 0
        v.append(p1.match(s1))              # 1
        v.append(p1.search(s1))             # 2
        v.append(re.search(r"there", s1))   # 3
        v.append(re.search(r"thee", s1))    # 4
        printf("v0: {0}\n".format(v[0]))
        printf("v1: {0}\n".format(v[1]))
        for i in range(2,5):
            if v[i] != None:
                printf("v[{0}]: match\n".format(i))
            else:
                printf("v[{0}]: no match\n".format(i))
    def tGroup(self):
        s1                      = "hello there, how are you? 1 23 456. ok, bye!\n"
        s2                      = "acg tttccc tcaa gagg gaggtcgt agctagg acgcg caatg acg"
        g1                      = re.search(r"(\d+)\s+(\d+)", s1)
        g2                      = re.search(r"(?P<num1>\d+)\s+(?P<num2>\d+)", s1)
        printf("            : {0}, {1}\n".format(g1.group(1), g1.group(2)))
        printf("named groups: {0}, {1}\n".format(g2.group('num2'), g2.group('num1')))
        ary                     = re.findall(r"\w+", s2)
        printf("ary of words: ")
        for v in ary:
            printf("{0}, ".format(v))
        printf("\n")

#def seqTypeTest():
#def setTypeTest():
#def mapTypeTest():
#def iterateTest():
#def copyObjTest():
#-------------------------------------------------------------------------------
def printf(format, *args):
    sys.stdout.write(format % args)
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
# FAQ Programming
# arguments are passed by assignment. Since assignment just creates references
# to objects, there's no alias between an argument name in the caller and callee,
# so no call by reference per se. 

class ReferenceTest:
    def referenceMod1(self, ary):
        # ary gets new values
        for i in range(0, len(ary)):
            ary[i]                  = ary[i] * 10
    def referenceMod2(self, ary):
        # ary gets new values
        ary.append(5)
    def referenceMod3(self, ary):
        # ary gets new values
        new_ary                     = ary
        for i in range(0, len(ary)):
            new_ary[i]              = ary[i] * 10
        ary                         = new_ary
    def referenceMod4(self, ary):
        # ary keeps original values, not new values
        ary                         = [4, 3, 2, 1, 0]
    def referenceMod5(self, ary):
        # ary keeps original values, not new values
        ary                         = [4, 3, 2, 1, 0]
        ary2                        = [5, 4, 3, 2, 1]
        ary                         = ary2
    def referenceMod6(self, ary):
        # ary keeps original values, not new values
        ary2                        = [5, 4, 3, 2, 1]
        ary                         = ary2
    def referenceMod7(self, ary):
        # assign ary2 to ary in call to get new values
        ary2                        = [5, 4, 3, 2, 1]
        return ary2
    def referenceTest(self):
        ary                         = [0, 1, 2, 3, 4]
        printSep()
        print("before list test1:             ", ary)
        printSep()
        self.referenceMod1(ary)
        print("after  list test1: mod vals:   ", ary)
        printSep()
        ary                         = [0, 1, 2, 3, 4]
        self.referenceMod2(ary)
        print("after  list test2: append:     ", ary)
        printSep()
        ary                         = [0, 1, 2, 3, 4]
        self.referenceMod3(ary)
        print("after  list test3: new ary:    ", ary)
        printSep()
        ary                         = [0, 1, 2, 3, 4]
        self.referenceMod4(ary)
        print("after  list test4: reassign:   ", ary)
        printSep()
        ary                         = [0, 1, 2, 3, 4]
        self.referenceMod5(ary)
        print("after  list test5: reassign:   ", ary)
        printSep()
        ary                         = [0, 1, 2, 3, 4]
        self.referenceMod6(ary)
        print("after  list test6: reassign:   ", ary)
        printSep()
        ary                         = [0, 1, 2, 3, 4]
        ary                         = referenceMod7(ary)
        print("after  list test7: reassign:   ", ary)
        printSep()
#-------------------------------------------------------------------------------

class A:
    def __init__(self, x=0, y=0):
        self.x                  = x
        self.y                  = y
    def mult(self):
        return self.x*self.y
    def add(self):
        return self.x+self.y
    def printMe(self):
        print("printMe class A {0} {1}".format(self.x, self.y))
    def __del__(self):
        print("Class A destructor")
class B:
    def __init__(self, x=0, y=0):
        self.x                  = x
        self.y                  = y
    def fand(self):
        return self.x & self.y
    def fxor(self):
        return self.x ^ self.y
    def printMe(self):
        print("printMe class B {0} {1}".format(self.x, self.y))
class C(A, B):
    def __init__(self, x=0, y=0, z=0):
        self.x                  = x
        self.y                  = y
        self.z                  = z
    def addAll(self):
        return self.add() + self.z
    def mult(self):
        return self.mult() * self.z
    def printMe(self):
        print("printMe class C {0} {1} {2}".format(self.x, self.y, self.z))
    def printVals(self, someVar):
        print("C: someVar {0}".format(someVar))
class D(C):
    def __init__(self, w=0, x=0, y=0, z=0):
        self.w                  = w
        self.x                  = x
        self.y                  = y
        self.z                  = z
    def printMe(self):
        print("printMe class D {0} {1} {2} {3}".format(self.w, self.x, self.y, self.z))
class E(C):
    def __init__(self, w=0, x=0, y=0, z=0):
        self.w                  = w
        self.x                  = x
        self.y                  = y
        self.z                  = z
    def printMe(self):
        print("E calling super")
        print("printMe class E {0} {1} {2} {3}".format(self.w, self.x, self.y, self.z))
        C.printMe(self)
    def printVals(self, v0, v1):
        print("E: v0, v1: {0} {1}".format(v0, v1))
class F:
    x                           = "Hello there"
    def printMe(self):
        print(self.x)
class G(F):
    def __init__(self):
        self.x                  = "Modified hello"
    def printAnotherMe(self):
        print(self.x)

#class AbstractA:
#    @abstractmethod
#    def doSomething(self):
#        pass
#    @abstractmethod
#    def doSomethingParam(self, a, b):
#        pass
#    @abstractproperty
#    def name(self):
#        pass

#-------------------------------------------------------------------------------
class CAlgorithms:
    def __init__(self):
        pass
    def swap2(self, a, i, j):
        tmp     = a[i]
        a[i]    = a[j]
        a[j]    = tmp
    def swap(self, a, i, j):    # 0110, 1010  = i,j
        a[i]    = a[i] ^ a[j]   # 0110 ^ 1010 = 1100
        a[j]    = a[j] ^ a[i]   # 1010 ^ 1100 = 0110 = a[j]
        a[i]    = a[i] ^ a[j]   # 1100 ^ 0110 = 1010 = a[i]
    def insertionSort(self, a): # O(n^2)
        for i in range(0, len(a), 1):
            for j in range(i, 1, -1):
                if(a[j]<a[j-1]):
                    self.swap(a,j,j-1)
    def bubbleSort(self, a):    # O(n^2)
        for i in range(0, len(a), 1):
            for j in range(len(a)-1, i+1, -1):
                if(a[j]<a[j-1]):
                    self.swap(a,j,j-1)
    def mergeSort(self, a0, a1, l, r):
        if(l == r):
            return
        m   = (l+r)/2
        self.mergeSort(self, a0, a1, l, mid)
        self.mergeSort(self, a0, a1, m+1, r)
        for i in range(l, r, 1):
            a1[i]   = a0[i]
        i1  = 1
        i2  = m + 1
        for i in range(l, r, 1):
            if(i1 == mid + 1):
                a0[i]   = a1[i2]
                i2      = i2 + 1

class CAlgosTests(CAlgorithms):
    def __init__(self):
        CAlgorithms.__init__(self)
        pass
class CHashAryDict:
    __ary   = None
    __s     = None
    def __init__(self):
        printf("Instance CHashAryDict\n")
        self.__ary  = []
        self.__s    = None
    def ary(self):
        a                       = [
                [[11,22],[33,44]],
                [[55,66],[77,88]],
                [[99,00],[12,34]]
            ]
        b                       = [0,7,2,5,4,3,6,1,8]
        for i in range(0, len(a)):
            for j in range(0, len(a[i])):
                printf("ary: a[{0:2d}][{1:2d}]={2:2s}\n".format(i, j, a[i][j]))                    
        c                       = ['0','7','2','5','4','3','6','1','8']
        d                       = '*'.join(c)
        printf("join: {0}\n".format(d))
        e                       = d.split('*')
        g                       = ','.join(e)
        printf("join: {0}\n".format(g))
        e.sort()
        g                       = ','.join(e)
        printf("join: {0}\n".format(g))
    def dictionaryTest(self):
        d1                          = dict([("a",1),("b",2),("c",3),("d",4),("e",5)])
        d2                          = dict({"a":1,"b":2,"c":3,"d":4,"e":5})
        d3                          = {"a":1,"b":2,"c":3,"d":4,"e":5}
    
        printSep()
        for key in d3.keys():
            print("{key} = {val}".format(key=key, val=d3.get(key)))

        printSep()
        d3.setdefault("f",6)
        d3.setdefault("g",7)

        printSep()
        print("for key, val in d3.items()")
        for key, val in d3.items():
            print("{key} = {val}".format(key=key, val=val))

        printSep()
        if "f" in d3:
            print("deleting f in d3")
            del d3["f"]
        else:
            print("f doesn't exist in d3: error")
        print("for key, val in d3.items() after deleting f")
        for key, val in d3.items():
            print("{key} = {val}".format(key=key, val=val))
        printSep()
    def thash2(self):
        d                       = {"a":1,"b":2,"c":3,"d":4,"e":5}
        for key in d.keys():
            print("{key} = {val}".format(key=key, val=d.get(key)))
        print("thash2 len(d)=%d"%(len(d)))
        d4                      = dict(a=1, b=2, c=3, d=4, e=5)
        for key, val in d4.items():
            print("{key} = {val}".format(key=key, val=val))
    def tHash1(self):
        d                       = {"a":1,"b":2,"c":3,"d":4,"e":5}
        k                       = "a"
        v                       = 0
        printSep()
        if k in d:              print("tHash1 1y: %s is d"%(k))
        else:                   print("tHash1 1n: %s is d"%(k))
        if k not in d:          print("tHash1 2n: %s is d"%(k))
        else:                   print("tHash1 2y: %s is d"%(k))
        k                       = "x"
        if k in d:              print("tHash1 3y: %s is d"%(k))
        else:                   print("tHash1 3n: %s is d"%(k))
        d[k]                    = 10
        if k in d:              print("tHash1 4y: %s is d"%(k))
        else:                   print("tHash1 4n: %s is d"%(k))
        keys                    = iter(d)
        for k in keys:
            print("             tHash1 keys %s=%d"%(k, d[k]))
        values                  = d.values()
        for v in values:
            print("             tHash1 vals %s=%d"%(k, d[k]))
        for val in values:
            print("             tHash1 search for %d"%(val))
            for k,v in d.items():
                if val == v:
                    print("     tHash1 match   %s = %d"(k,v))
                    break
                else:
                    print("     tHash1 nomatch %s = %d"(k,v))
    def passModAry(self, ary):
        ary.sort()
        return ary
    def passModAry2(self, ary):
        ary[0]                  = '9021i3'
        return ary
    def passModAry3(self, ary):
        retAry                  = ary
        retAry.sort()
        return retAry
    def passModAry4(self, ary):
        retAry                  = copy.deepcopy(ary)
        retAry.sort()
        return retAry
    def passModAry5(self, ary):
        retAry                  = [row[:] for row in ary]
        retAry.sort()
        return retAry
    def passModAry6(self, ary):
        ary                     = ['1','2','1','2','1','2']
        return ary
    def retMultiVal1(self):
        a                       = 1
        b                       = 2
        return a,b
    def retMultiVal2(self):
        a1                      = 1
        a2                      = 2
        b                       = 'cat'
        c                       = 'dog'
        d                       = 3.1415
        return (a1,a2),(b,c),d
    def multiValTest(self):
        printSep()
        a,b                     = self.retMultiVal1()
        printf("multival: {0} {1}\n".format(a,b))
        a,b,c                   = self.retMultiVal2()
        printf("multival: {0} {1} {2} {3} {4}\n".format(a[0], a[1], b[0], b[1], c))
    def retModAryMulti(self):
        a                       = [
                                    [[11,22],[33,44]],
                                    [[55,66],[77,88]],
                                    [[99,00],[12,34]]
                                ]
        return a
    def retModAryMulti1(self):
        a                       = [[11,22],[33,44],[55,66],[77,88],[99,00],[12,34]]
        return a
    def passModAryTest(self):
        a                       = ['0','7','2','5','4','3','6','1','8']
        c                       = [0,7,2,5,4,3,6,1,8]
        b                       = self.passModAry(a)
        printSep()
        ag                      = ','.join(a)
        bg                      = ','.join(b)
        printf("join passModAry:  {0}\n".format(ag))
        printf("join passModAry:  {0}\n".format(bg))
        d                       = self.passModAry2(a)
        ag                      = ','.join(a)
        dg                      = ','.join(d)
        printf("join passModAry2: {0}\n".format(ag))
        printf("join passModAry2: {0}\n".format(dg))
        printSep()
        a                       = ['0','7','2','5','4','3','6','1','8']
        b                       = self.passModAry3(a)
        ag                      = ','.join(a)
        bg                      = ','.join(b)
        printf("join passModAry3: {0}\n".format(ag))
        printf("join passModAry3: {0}\n".format(bg))
        printSep()
        a                       = ['0','7','2','5','4','3','6','1','8']
        b                       = self.passModAry4(a)
        ag                      = ','.join(a)
        bg                      = ','.join(b)
        printf("join passModAry4: {0}\n".format(ag))
        printf("join passModAry4: {0}\n".format(bg))
        printSep()
        a                       = ['0','7','2','5','4','3','6','1','8']
        b                       = self.passModAry5(a)
        ag                      = ','.join(a)
        bg                      = ','.join(b)
        printf("join passModAry5: {0}\n".format(ag))
        printf("join passModAry5: {0}\n".format(bg))
        printSep()
        a                       = ['0','7','2','5','4','3','6','1','8']
        b                       = self.passModAry6(a)
        ag                      = ','.join(a)
        bg                      = ','.join(b)
        printf("join passModAry6: {0}\n".format(ag))
        printf("join passModAry6: {0}\n".format(bg))
    def passModAryTest2(self):
        printSep()
        a                       = self.retModAryMulti()
        printf("retModAryMulti: ")
        for i in range(0, len(a)):
            for j in range(0, len(a[i])):
                for k in range(0, len(a[i][j])):
                    printf("[{0}][{1}][{2}]={3} ".format(i, j, k, a[i][j][k]))
        printf("\n")
        printf("retModAryMulti: ")
        for i in range(0, len(a)):
            for j in range(0, len(a[i])):
                printf("[{0}][{1}]={2} ".format(i, j, a[i][j]))
        printf("\n")
        printSep()
        ag                      = ','.join(str(a))
        printf("join retModAryMulti: {0}\n".format(ag))
        printSep()
        a                       = self.retModAryMulti1()
        printf("retModAryMulti: ")
        for i in range(0, len(a)):
            for j in range(0, len(a[i])):
                printf("[{0}][{1}]={2} ".format(i, j, a[i][j]))
        printf("\n")
    def retReference(self, v):
        v                       = 5
        return v
    def refTest(self):
        a                       = 1
        b                       = self.retReference(a)
        printf("refTest:          {0} {1}\n".format(a, b))
        a                       = self.retReference(a)
        printf("refTest:          {0}\n".format(a))
    def multiHash(self):
        a                       = [11,22,33]
        b                       = [44,55,66]
        c                       = [77,88]
        h                       = dict({'ha':a, 'hb':b, 'hc':c})
        printSep()
        for key in h.keys():
            printf("{0}: ".format(key))
            for i in range(0, len(key)):
                printf("[{0}]:{1} ".format(i, key[i]))
            printf("\n")
    #def hashAry(self):
    #def printMe(self):
    def testControlFlow(self):
        a                           = 1
        b                           = 10
        c                           = 100
        aryNum                      = [1, 2, 3, 4, 5]
        aryLet                      = ["a","b","c","d","e","f","g"]
        sLet                        = "abcdefg"
        i                           = 0
    
        printSep()
        if c <= 1:
            print("{0} <= 1".format(c))
        elif c <= 10:
            print("{0} <= 10".format(c))
        else:
            print("{0} > 10".format(c))
        printSep()
        for j in aryNum:
            print("aryPrint: {0}".format(j))
        printSep()
        for j in range(0, len(aryNum)):
            print("aryPrint: {index}: {value}".format(index=j, value=aryNum[j]))
        printSep()
        for j in xrange(len(aryNum)):
            print("aryPrint: {0}: {1}".format(j, aryNum[j]))
        printSep()
        for j in xrange(3,len(aryNum)):
            print("aryPrint: {0}: {1}".format(j, aryNum[j]))
        printSep()
        for let in sLet:
            print("sLet: {0}".format(let))
        printSep()
        for j in xrange(len(sLet)):
            print("sLet: {0}: {1}".format(j, sLet[j]))
        printSep()
        for let in aryLet:
            if let in "ae":
                print("{0} is vowel".format(let))
            else:
                print("{0} is consonant".format(let))
    def loopingTest(self):
        a0                          = [1, 2, 3, 4, 5]
        a1                          = ["a","b","c","d","e","f","g"]
        a2                          = "fghijklmnop"
        a4                          = [[11,22],[33,44],[55,66],[77,88],[99,00],[12,34]]
        a5                          = {1:"a",2:"b",3:"c",4:"d",5:"e",7:"f",9:"g"}
        print("-----------loopingTest-----------------")
        print("-----------enumerate-------------------")
        for k,v in enumerate(a0):
            print(k,v)
        print("-----------enumerate-------------------")
        for k,v in enumerate(a1):
            print(k,v)
        print("-----------for [:]---------------------")
        for k in a1[:]:
            print(k)
        print("-----------range-----------------------")
        for k in range(0, len(a1)):
            print(k, a1[k])
        print("-----------enumerate-------------------")
        for k,v in enumerate(a2):
            print(k,v)
        print("-----------enumerate-------------------")
        for k,v in enumerate(a4):
            print(k,v)
        print("-----------items-----------------------")
        for k,v in a5.items():
            print(k,v)
    def retAry(self):
        a                   = [1,2,3,4,5]
        return a
    def retMultiAry(self):
        a                   = [[1,2,3],[4,5,6],[7,8]]
        return a
    def retRefAry1(self, ary):
        ary[0]              = 999
        return ary
    def retRefAry2(self, ary):
        ary                 = [1,2,3,4,5]
        return ary
    def retHash(self):
        h                   = {1:11, 2:22, 3:33, 4:44, 5:55}
        return h
    def retRefHash1(self, hv):
        hv.setdefault(10,1010)
        return hv
    def retRefHash2(self, hv):
        hv                  = {11:111, 22:222, 33:333, 44:444, 55:555}
        return hv
    def tAry(self):
        a                   = [1,2,3,4,5]
    def tHash(self):
        h                   = {1:11, 2:22, 3:33, 4:44, 5:55}
    def setAry(self,a):
        self.__ary = a
    def getAry(self):
        return self.__ary
    def makeAry(self,s):
        a   = []
        l   = len(s)
        for i in range(l):
            a.append(s[i])
        return a
    def randIntGen(self, min, max, length):
        a       = []
        newmax  = max - min
        for i in range(length):
            v   = random.randrange(newmax) + min
            a.append(v)
        return a
    def randSetGen(self, inArySet, length):
        a       = []
        for i in range(length):
            v   = random.choice(inArySet)
            a.append(v)
        return a
    def randStringGen(self, length):
        s       = 'abcdefghijklmnopqrstuvwxyz'
        a       = self.makeAry(s)
        ret     = []
        for i in range(length):
            v   = random.choice(a)
            ret.append(v)
        return ret
    def randStringNumGen(self, length):
        s       = 'abcdefghijklmnopqrstuvwxyz0123456789'
        a       = self.makeAry(s)
        ret     = []
        for i in range(length):
            v   = random.choice(a)
            ret.append(v)
        return ret
    def makeString(self, a):
        s       = ''
        for i in range(len(a)):
            s   = s + a[i]
        return s
    def sort0s1s(self, a):
        i       = 0
        j       = len(a) - 1
        while(i < j):
            if(a[i] == "1"):
                if(a[i] != a[j]):
                    self.swap(a,i,j)
                j   = j - 1
            if(a[i] == "0"):
                i   = i + 1
    def swap(self, a, i, j):
        tmp     = a[j]
        a[j]    = a[i]
        a[i]    = tmp
    def sort0s1s2s(self, a):
        i       = 0
        l       = 0
        r       = len(a)-1
        ctrTest = 0
        limit   = 1000
        while(i < r and l < r and ctrTest < limit):
            if(i < 0 or i > (len(a)-1)):
                msg('error: i out of range = {0}'.format(i))
                break
            if(a[i] == "0"):
                self.swap(a,i,l)
            if(a[i] == "2"):
                self.swap(a,i,r)
            if(a[l] == "0"):
                l = l + 1
            if(a[i] == "1"):
                i = i + 1
            if(a[r] == "2"):
                r = r - 1
            ctrTest = ctrTest + 1
            if(ctrTest >= limit):
                msg('error: ctrTest limit={0}'.format(ctrTest))
    def quickSort(self, a):
        self.quickSortRecursive(a, 0, len(a))
        self.self_check_sorted(a)
    def quickSortRecursive(self, a, i, j):
        if(i<j):
            k = self.quickSortPartition(a,i,j)
            self.quickSortRecursive(a,i,k)
            self.quickSortRecursive(a,k+1,j)
    def quickSortPartition(self, a, lo, hi):
        i = lo
        j = hi + 1
        if(j >= len(a)):
            raise Exception('quickSortPartition j({0}) >= len(a)({1})'.format(j, len(a)))
        v = a[lo]
        while(True):
            while(a[i]<v):  # stop when left >= right at i
                if(i == hi):
                    break
                i = i + 1
            while(v<a[j]):  # stop when right <= left at j
                if(j == lo):
                    break
                j = j - 1
            if(i >= j):
                break
            sb = self.makeString(a)
            self.swap(a,i,j)
            sa = self.makeString(a)
            msg('before ({0:02d}={1},{2:02d}={3}):{4}'.format(i,a[i],j,a[j],sb))
            msg('after  ({0:02d}={1},{2:02d}={3}):{4}'.format(i,a[i],j,a[j],sa))
        sb = self.makeString(a)
        self.swap(a,lo,j)   # swap lo with right most
        sa = self.makeString(a)
        msg('before ({0:02d}={1},{2:02d}={3}):{4}'.format(i,a[i],j,a[j],sb))
        msg('after  ({0:02d}={1},{2:02d}={3}):{4}'.format(i,a[i],j,a[j],sa))
        return j
    def self_check_sorted(self, a):
        c = None
        p = -1
        for i in range(len(a)):
            if(p < a[i]):
                s = self.makeString(a)
                raise Exception('error order: {0}'.format(s))
            p = a[i]
 
class CMath:
    def __init__(self):
        print("Instancing CMath")
    def t1(self):
        v                   = math.cos(math.pi/4)
        printf("{0}\n".format(v))
    def t2(self):
        a                   = [0,2,4,6,8]
        v                   = random.choice(a)
        printf("choice: {0}\n".format(v))
        v                   = random.sample(range(100), 10)
        printf("random sample: ")
        for i in range(len(v)):
            printf("{0}:{1} ".format(i, v[i]))
        printf("\n")
        v                   = random.randint(10,20)
        print('random int: {0}'.format(v))
        v                   = random.randrange(100)
        printf("random int: {0}\n".format(v))
        v                   = random.random()
        printf("random float: {0}\n".format(v))
class CCollections:
    def tDequeue(self):
        q                   = collections.deque()
        print("--------range(5) deque--------")
        for i in range(5):
            q.append(i*10 + 11)
        print("--------len(deque)------------")
        for i in range(len(q)):
            print(q[i])
        print("-----------rotate-------------")
        q.rotate()
        for i in range(len(q)):
            print(q[i])
    def t1(self):
        self.tDequeue()    
class Singleton(object):
    _instance = None
    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(Singleton, cls).__new__(
                                cls, *args, **kwargs)
        return cls._instance
    def __call__(self):
        print('Singleton __call__')
    def __init__(self):
        print('Singleton __init__')
#class Test


#-------------------------------------------------------------------------------
class TestClass:
    __c = None
    def __init__(self):
        self.__c                = CHashAryDict()
        return
    def globalVarTest(self):
        G_IVAR                      = 1 
        def globalVarTestSub():
            #nonlocal G_IVAR         # bind to outer variable, python 3 only
            #print("global: {0}".format(G_IVAR))
            print("Not working in python 2")
        print("local:  {0}".format(G_IVAR))
        globalVarTestSub()
    def tCollections(self):
        c                       = CCollections()
        c.t1()
    def tCMath(self):
        c                       = CMath()
        c.t1()
        c.t2()
    def tCHashAryTest(self):
        c                           = CHashAryDict()
        #c.ary()
        c.thash2()
        c.dictionaryTest()
        #c.passModAryTest()
        #c.testControlFlow()
        #c.passModAryTest2()
        #c.multiValTest()
        #c.refTest()
        #c.multiHash()
        #c.loopingTest()
    def t0_sort0s1s2s_0(self):
        numcases    = 10
        refs        = '012'
        refa        = self.__c.makeAry(refs)
        for i in range(numcases):
            a       = self.__c.randSetGen(refa,20)
            sb      = self.__c.makeString(a)
            self.__c.sort0s1s2s(a)
            sa      = self.__c.makeString(a)
            msg('{0:02d}: a before {1}'.format(i, sb))
            msg('{0:02d}: a before {1}'.format(i, sa))
    def t1_stringcmp_test(self):
        s0  = 'abcdef123hijklAb'
        s1  = 'bcdefg033ghijkaB'
        a0  = self.__c.makeAry(s0)
        a1  = self.__c.makeAry(s1)
        l0  = len(s0)
        l1  = len(a0)
        msg('t1: l0:{0} l1:{1}'.format(l0, l1))
        for i in range(l0):
            if(a0[i] == a1[i]):
                msg('   {0} == {1}'.format(a0[i],a1[i]))
            if(a0[i] <  a1[i]):
                msg('   {0} <  {1}'.format(a0[i],a1[i]))
            if(a0[i] >  a1[i]):
                msg('   {0} >  {1}'.format(a0[i],a1[i]))
    def t2_re_0(self):
        s0 =    ' little bo beep sat on a sheep when it leapt from the steep hill ' \
                'whilst abs3al thought no frill.'
        s1 =    '<br><a href=\'blah123.*\' b=98>bl 9123hajskd \\\ht \\\qt \\\7t \\\\an ' \
                '\am \\ye[1 h_99_hh.aas 2he . 9&* &*(89)a8s(*(@@) </href></br>'
        s2 = []
        s2.append('DOTALL, S Make . hqwehqkjn didhqwo qdijojwoiq1278jeoiq asd90q8d0 ')
        s2.append('IGNOIiysd9a8s7d as8d7 a9sdkqkq,ne,12he18&&*w68d d89w7d8(&d98 aw7d8a ada')
        s2.append('<wya98dyc (SAdyas9 8DY(DsaD>SA dua9s*D& (AS*Du as dlsaud98a, . qw e ,mqw,n. syd9')
        msg(s0)
        msg(s1)
    def tSingleton(self):
        #if __name__ == '__main__':
        s1=Singleton()
        s2=Singleton()
        if(id(s1)==id(s2)):
            print("Same")
        else:
            print("Different")

    def classTest1(self):
        a                           = A(10, 20)
        c                           = C(2, 4, 8)
        d                           = D(2, 3, 4, 5)
        e                           = E(2, 3, 4, 5)
        x                           = a.add()
        y                           = c.addAll()
        z                           = c.add()
        c_copy                      = copy.deepcopy(c)
        printf("x {0}; y {1}; z {2}\n".format(x, y, z))
        a.printMe()
        c.printMe()
        d.printMe()
        e.printMe()
        c.printVals(3)
        e.printVals(4, 5)
        c_copy.printMe()
        f                           = F()
        g                           = G()
        f.printMe()
        g.printMe()
    def variableArgs(self, *args):
        printSep()
        for arg in args:
            print(arg)
    # not compatible with 2.7
    #def variableArgsFixed(*args, fixedArg=0):
    #    variableArgs(args)
    #    print("fixedArg: {0}".format(fixedArg))
    
    def variableArgsTest(self):
        self.variableArgs(1, 2, 3, 4)
        self.variableArgs(1, "hello", "what")
        #variableArgsFixed(1, 2, 3, fixedArg="this is fixed")
    def tCStringT(self):
        c                       = CStringT()
        #c.t1()
        #c.tSliceTest1()
        #c.tSliceTest2()
        #c.tSliceTest3()
        #c.tSliceTest4()
        #c.tTitle()
        #c.tJustify()
        #c.tConvert1()
        c.printFormatTest()
    def tCFile(self):
        c                           = CFile()
        #c.tFileAccess()
        c.tArgParse()
    def innerFunctions(self):
        def func1():
            print("Hello 1")
        def func2():
            print("Hello 2")
        def printS(s):
            print("Hello 3")
        func1()
        printS("Which one")         # uses local version of printS, not global
    def cmdLineTest(self):
        msg                         = "Enter something. q to quit: "
        iString                     = ""
        try:
            while iString is not "q":
                iString             = raw_input(msg)
                printS("You entered: {0}".format(iString))
        except Exception as e:
            s                       = "{0}".format(e)
            printS(s)
    def instanceTest(self):
        a   = A()
        b   = B()
        c   = C()
        d   = D()
        print('instanceTest: type: {0}'.format(type(a)))
        print('instanceTest: isinstance a,A {0}'.format(isinstance(a,A)))
        print('instanceTest: isinstance a,B {0}'.format(isinstance(a,B)))
        print('instanceTest: isinstance a,C {0}'.format(isinstance(a,C)))
        print('instanceTest: isinstance c,A {0}'.format(isinstance(c,A)))
        print('instanceTest: isinstance c,B {0}'.format(isinstance(c,B)))
        print('instanceTest: isinstance c,C {0}'.format(isinstance(c,C)))
        print('instanceTest: issubclass C,A {0}'.format(issubclass(C,A)))
        print('instanceTest: issubclass C,B {0}'.format(issubclass(C,B)))
        print('instanceTest: issubclass C,C {0}'.format(issubclass(C,C)))
    def alignmentTest(self):
        as0         = AlignmentString()
        as0.prepend()
        as0.t1()
        as0.prepend("t2")
        as0.t2()
        as0.prepend("tuple")
        as0.testTuple()
        as0.prepend("list")
        as0.testList()
    def tRegEx(self):
        c                           = CRegEx()
        #c.regExTest1()
        #c.regexTest2()
        #c.t3()
        c.tGroup()
    def referenceTest(self):
        c                           = ReferenceTest()
        c.referenceTest()
    def arithOps(self):
        s0      = '10.1'
        s1      = '9'
        s2      = '-7'
        s3      = '10.6'
        x       = abs(s2)
        msg('abs(-7)={0}'.format(x))
        f       = float(s0)
        msg('float({0})={1}'.format(s0,f))
        i       = int(s0)
        msg('int({0})={1}'.format(s0,i))
        i       = math.trunc(s0)
        msg('math.trunc({0})={1}'.format(s0,i))
        i       = round(s0,1)
        msg('round({0})={1}'.format(s0,i))
    def sleepTest(self):
        print('sleep test now. wait 5 secs')
        time.sleep(5)
        print('sleep test now. after 5 secs')
    def timeTest(self):
        ltime = time.localtime()
        print('time: year  {0}'.format(ltime.tm_year))
        print('time: mon   {0}'.format(ltime.tm_mon))
        print('time: day   {0}'.format(ltime.tm_mday))
        print('time: hour  {0}'.format(ltime.tm_hour))
        print('time: min   {0}'.format(ltime.tm_min))
        print('time: sec   {0}'.format(ltime.tm_sec))
        print('time: wday  {0}'.format(ltime.tm_wday))
        print('time: yday  {0}'.format(ltime.tm_yday))
        print('time: isdst {0}'.format(ltime.tm_isdst))
        print('time: ctime {0}'.format(time.ctime()))
    def threadingHelper(self, id, sec):
        print('threadingHelper id {0} sleep {1} starting at {2}'.format(id, sec, time.ctime()))
        time.sleep(sec)
        print('threadingHelper id {0} sleep {1} done     at {2}'.format(id, sec, time.ctime()))
    def threadingTest(self):
        threads = []
        print('threadingTest all start at {0}'.format(time.ctime()))
        for i in range(0,4):
            t = threading.Thread(target=self.threadingHelper, args=(i, i))
            threads.append(t)
        for i in range(0,4):
            threads[i].start()
        for i in range(0,4):
            threads[i].join()
        print('threadingTest all done  at {0}'.format(time.ctime()))
    def test(self):
        #exceptionTest()
        #self.variableArgsTest()
        #referenceTest()
        #self.innerFunctions()
        #globalVarTest()
        #parse_quote_file_test()
        #self.referenceTest()
        #self.classTest1()
        #self.tCHashAryTest()
        #self.tCMath()
        #self.tCStringT()
        #self.tCollections()
        #self.tRegEx()
        #self.tCFile()
        #self.regexTest2()
        #self.alignmentTest()
        #self.sleepTest()
        self.threadingTest()
        #self.timeTest()

def main():
    c   = TestClass()
    c.test()
main()


