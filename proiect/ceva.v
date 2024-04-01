module X(A,B,OUT);
input A,B;
output OUT;
assign OUT=A^B;

endmodule;
module Testbench;

reg a,b;
wire rez;

XOR X(a,b,rez);

initial
 begin

A=0;B=0;
#1 $display("xor=%b", rez);
end
endmodule;