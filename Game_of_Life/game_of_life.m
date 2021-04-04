clear
%% game of life.
% proceed as such
% generate a 0,1 matrix
% expand it by one at each size
% get all its neighbours
% check its neighbours
% apply conditions to live
% animate 

%% generating a matrix
s=[32,32];
cells = rand(s);
cells=sign(sign(cells-0.989)+1);
% matrix if size s and having units 0 and 1 generated

%% generating the next matrix
% there is a seperate function to get neighbours of each element
% >> search_neigh(X,i,j)
% a function to generate the next matrix
% >> nextcells(cells)

%% ANIMATING & saving the file
% generations we vant t animate
 
figure('Units','normalized','Position',[0.3 0  0.6 1]);
axis square;
GEN= 500;
M=moviein(GEN);

VID = VideoWriter("video_rj%4567b_.avi");
open(VID);
for k=1:GEN % converting the matrix into an image
    cells=nextcells(cells);
    for i=1:s(1)
        for j =1:s(2)
            CELLS(i,j,:) = [0 0 cells(i,j)];
        end
    end 
    image(CELLS,'CDataMapping','scaled','CData',CELLS)
    M(k)=getframe();
    writeVideo(VID,getframe(gcf));
end
close(VID)

