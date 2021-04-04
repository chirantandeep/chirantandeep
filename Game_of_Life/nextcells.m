function X=nextcells(X)
%this function generates the nest generation of cells in game of life
%according to general rules.
s=size(X);
for i=1:s(1)
    for j=1:s(2)
        
        neigh=sum(search_neigh(X,i,j));
        
        if X(i,j) % if X(i,j)==1 ALIVE
            if (neigh==2)%||(neigh==3)
                X(i,j)=0;
            end
        elseif (neigh==2)%||(neigh==0) % if X(i,j)==0 DEAD and has 3 neighbours
            X(i,j)=1;
        end
        
    end
end
