/* Created by Tony Kwok on 12/29/2916 */
(function() {
    weatherApp.service('commonServices', [function(){
                
        // O(1) constant for add/remove head/tail
        // O(n) linear for search, indexOf
        
        this.linkedList = function() {
            function LinkedList() {
                this.head = null;
                this.tail = null;
            }

            function Node(value, next, prev) {
                this.value = value;
                this.next = next;
                this.prev = prev;
            }

            LinkedList.prototype.addToHead = function(value) {
                var newNode = new Node(value, this.head, null);
                
                if (this.head) this.head.prev = newNode;
                else this.tail = newNode;
                
                this.head = newNode;
            };

            // add to the tail, there will be no next node
            LinkedList.prototype.addToTail = function(value) {
                var newNode = new Node(value, null, this.tail);
                
                if (this.tail) this.tail.next = newNode;
                else this.head = newNode;
                
                this.tail = newNode;
            };

            LinkedList.prototype.removeHead = function() {
                if (!this.head) return null;
                
                var val = this.head.value;
                    this.head = this.head.next;
                    if (this.head) this.head.prev = null;
                    else this.tail = null;
                
                return val;
            };

            LinkedList.prototype.removeTail = function() {
                if (!this.tail) return null;
                
                    var val = this.tail.value;
            
                    this.tail = this.tail.prev;
                    if (this.tail) this.tail.next = null;
                    else this.head = null;

                return val;
            };

            LinkedList.prototype.search = function(searchValue) {
                var currentNode = this.head;
                    while(currentNode) {
                        if (currentNode.value === searchValue) return currentNode.value;
                        currentNode = currentNode.next;
                    }
            };

            LinkedList.prototype.indexOf = function(value) {
                var indexes = []; 
                var currentNode = this.head;
                var currentIndex = 0;

                while(currentNode) {
                    if (currentNode.value === value) { 
                        indexes.push(currentIndex);
                    }
                    currentNode = currentNode.next;
                    currentIndex++;
                }
                return indexes;
            };            
        };                             
                                     
        // O(log n) compelxity
        // very efficient
        this.binarySearch = function(array, key) {
          var low = 0;
          var high = array.length - 1;
          var mid;
          var element;

          while (low <= high) {
            mid = Math.floor((low + high) / 2, 10);
            element = array[mid];
            if (element < key) {
              low = mid + 1;
            } else if (element > key) {
              high = mid - 1;
            } else {
              return mid;
            }
            return -1;
          }
        };                             
                                     
    }]);                            
})();