# Git Foundations Walk-through

Create a new folder for experimentation.  
Name this folder _sam_.

Create an empty git repository in _sam_.

    git init 

This creates a folder named _.git_ and populattes it
with various files and folders.
We will experiment with the essential files under _.git_.

View the contents of _.git/config_.  It contains the following line.

    bare = false

This means that the repository is inside a folder that
will be used by a developer working locally.
If bare were set to true, it would indicate that the repository
resides on its own and is used as a remote repository only.

Git depends on the SHA-1 hash function.
The SHA-1 function produces a 20-byte string from a file.

Files stored in Git are locatable through their SHA-1 hash.
For this reason, Git is called a _content addressable file system_.

Git stores files under _.git/objects_.
If you look in there now, there are two empty folders into and pack.
I don't know what these are used for.
Other than these 2 files, the objects folder is empty.

Create a file named _hello.txt_ with the text _hello_ stored in it.
We will use this for experimentation.

Use the _git hash-object_ command to compute the git hash value of _hello.txt_.

    git hash-object hello.txt

This command displays the 20-byte hash of the file.

    ce013625030ba8dba906f756967f9e9ca394464a

Use the _git hash-object_ command to tell git to store the file under its hash.

    git hash-object -w hello.txt

Git stores the file under the following folder.

    .git/objects/ce

Notice that the first 2 characters of the hash is taken for the folder name.

Use the _git cat-file_ command with the _-t option_ to the type of object stored under a given hash.

    git cat-file -p ce013625030ba8dba906f756967f9e9ca394464a

The type reported is _blob_ because Git stores files as blob objects.

Use the _git cat-file_ command with the _-p option_ to inspect the contents of the object stored under a given hash.

    git cat-file -p ce013625030ba8dba906f756967f9e9ca394464a

Git stores folders as tree objects.
For the purpose of illustration, create file _bye.txt_ with contents _bye_.

Store _bye.txt_ in Git's object store.

    git hash-object -w bye.txt

Git displays its hash of the file.

    b023018cabc396e7692c70bbf5784a93d3f738ab

Git produces tree objects from a file called the index.
Check under _.git_ that the index file doesn't yet exist.

As a first step, use the _git update-index_ command to create the index
file and add _hello.txt_ to it.

    git update-index --add hello.txt

Verify that _.git/index_ now exists.

Add _bye.txt_ to the index.

    git update-index --add bye.txt

Use _git write-tree_ to write the index into the object store as a tree object.

    git write-tree

The _write_tree_ command displays a git hash value that identifies the tree object
in the object store.

    02671cb81375cd06bc56f0c4f94064afe5324bbc

Verify that the newly created object is a tree object.

    git cat-file -t 02671cb81375cd06bc56f0c4f94064afe5324bbc

Look at the contents of the tree obejct.

    git cat-file -p 02671cb81375cd06bc56f0c4f94064afe5324bbc

The command displays the following.

    100644 blob b023018cabc396e7692c70bbf5784a93d3f738ab    bye.txt
    100644 blob ce013625030ba8dba906f756967f9e9ca394464a    hello.txt

From this, you can see that git tree objects contain a list of objects,
which include each object's permissions, type, hash and filename.

Let's see what a folder looks like when placed in the repository.
Actually, you can only add files into the index, so we need
to have a file in the folder we want to test.

Create a folder called _test_ and copy _bye.txt_ into it.

Add _test/bye.txt_ into the index.

    git update-index --add test/bye.txt

Write the index into the object store.

    git write-tree

This displays the following hash for the new tree object.

    e2265495a2b7c2572d86a2dc7abf64280f05cd08

Verify the new tree object is in the data store.

    ls .git/objects

Verify the type of the new tree object.

    git cat-file -t e2265495a2b7c2572d86a2dc7abf64280f05cd08

Verify the contents of the new tree object.

    git cat-file -p e2265495a2b7c2572d86a2dc7abf64280f05cd08

This produces the following output.

    100644 blob b023018cabc396e7692c70bbf5784a93d3f738ab    bye.txt
    100644 blob ce013625030ba8dba906f756967f9e9ca394464a    hello.txt
    040000 tree b72ea0f9eb903bf5f9eebd9150a001878fd9d337    test

Notice that the test folder is represented as a tree object with
a hash value that we have not seen yet. Examine the contents
of the test tree object.

    git cat-file -p b72ea0f9eb903bf5f9eebd9150a001878fd9d337

This produces the following output.

    100644 blob b023018cabc396e7692c70bbf5784a93d3f738ab    bye.txt

Notice that the _bye.txt_ file in the _test_ folder has the same
hash as the _bye.txt_ file in the root folder.  These files are
identical, so the two tree objects that reference them point to the
same blob object.

Change the contents of _hello.txt_ to something else.

Restore the previous contents of _hello.txt_.

    git cat-file -p ce013625030ba8dba906f756967f9e9ca394464a > hello.txt

Next, we will look at a new object type: the commit object.
A commit object represents a snapshot of the state of the working tree.
The commit object contains the hash value of the tree object that was
created out of the index, a comment, timestamp, and identification
of the committer.

Create a commit object for the first top-level tree object created.

    echo "first commit" | git commit-tree 02671cb81375cd06bc56f0c4f94064afe5324bbc

This produces the following hash.

    7f62b53548a8d6df5d49238c1023fdf6650c9fb0

Check that the hash refers to a commit object.

    git cat-file -t 7f62b53548a8d6df5d49238c1023fdf6650c9fb0

Look at the contents of the commit object.

    git cat-file -p 7f62b53548a8d6df5d49238c1023fdf6650c9fb0

The commit object just created has no parent because it starts a branch.
Create a commit object for the second top-level tree object in the
object store and specify the first commit object as the parent.

    echo "second commit" | git commit-tree e226 -p 7f62

Notice that we are now abreviating the hash values to 4 characters.
Use as many characters as necessary to distinguish hash values but
also use at least 4 characters.

The hash value of the second commit is the following.

    f52a559d24982751d9427b9fcafe83c8c8342d93

Examine the commit log.

    git log --stat f52a




NEXT: recreate the working tree from the object store.

ALSO: explain concept of working tree.




