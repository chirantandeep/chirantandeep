function ONES = search_neigh(A,x,y)
%% Description
% the function displays the neighbouring values of an element of  a 2
% dimensional matrix. The usage is very simple : 
%search_neigh(matrix,abassica,ordinnate)

% simply checking the functionality
%>> A=[1 2 3; 2 3 4; 3  4 5]
%A =
%     1     2     3
%     2     3     4
%     3     4     5
%>>search_neigh(A,2,3)
%ans =
%     5     4     3     2     3     0     0     0
%% the function

% initial zeros for non exixting elements are given a value of zero
ONES= zeros(1,8);
[sx,sy]=size(A);

% to make use of matrix computing of matlab, extending onto matrices
XY=[];sXY=[];
for i=1:8
    XY(i,:)=[x y];
    sXY(i,:)=[sx sy];
end

% defining a neighbourhood matrix to be aded to the coordinates to get all
% the eight neighbourhoods of the point
%neigh=[1,1;2,2;-1,-1;-2,-2;0,0;0,0;0,-0;0,0];
neigh=[1,0;1,-1;0,-1;-1,-1;-1,0;-1,1;0,1;1,1];
% the final points
XY=XY+neigh;

% a boolean array of possibility of the neighbour coordinates to be
% existing or not, Just checking the posibillity
sXY=(XY>sXY)|(XY<ones(8,2));

% finally a loop that checks the existance of a neighbour and assigns the
% value to the ONES matrix/array.
for j=1:8
    if sXY(j,1)==0&&sXY(j,2)==0 % checking the existsnce of a neighbour
        xy=XY(j,:);
        ONES(1,j)=A(xy(1),xy(2));% assigning the values of the neighbour
    end
end

end