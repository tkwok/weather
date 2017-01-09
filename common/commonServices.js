/* Created by Tony Kwok on 12/29/2916 */
(function () {
    weatherApp.service('commonServices', [function () {
        /* Linked List Implementation
           O(1) constant for add/remove head/tail
           O(n) linear for search, indexOf
        */
        var self = this;
        self.LinkedList = function () {
            this.head = null;
            this.tail = null;

            function Node(value, prev, next) {
                this.value = value;
                this.prev = prev;
                this.next = next;
            }
            
            // add a node to the LL head
            self.LinkedList.prototype.addToHead = function (value) {
                var newNode = new Node(value, null, this.head);
                if (this.head) this.prev.head = newNode;
                else this.tail = newNode;
                this.head = newNode;
            };
            
            // remove a node from the LL head
            self.LinkedList.prototype.removeHead = function () {
                var val = this.head.value;
                this.head.next = this.head;
                if (this.head) this.head.prev = null;
                else this.tail = null;
                return val;
            };
        };
        /* 
            Hash Table Implementation
        */
        self.HashTable = function (size) {
                this.buckets = new Array(size);
                this.numBuckets = this.buckets.length;

                function HashNode(key, value, next) {
                    this.key = key;
                    this.value = value;
                    this.next = next || null;
                }
            
                // hashing function by sum then mod by bucket size
                self.HashTable.prototype.hash = function (key) {
                    for (var i = 0, total = 0; i < key.length; i++) {
                        total += key.charCodeAt(i);
                    }
                    return total % this.numBuckets;
                };
            
                // insert a hash node handle collision by attaching to next
                self.HashTable.prototype.insert = function(key) {
                  var index = this.hash(key);  
                  if (this.buckets[index]) this.bucket[index] = new HashNode(key,value);   else {
                      var currentNode = this.buckets[index];
                      while(currentNode.next) {
                          currentNode = currentNode.next;
                      }
                      currentNode.next = new HashNode(key, value);
                  } 
                };
        };
        
            // O(log n) complexity
            // very efficient
        self.binarySearch = function (array, key) {
            var low = 0;
            var high = array.length - 1;
            var mid;
            var element;
            while (low <= high) {
                mid = Math.floor((low + high) / 2, 10);
                element = array[mid];
                if (element < key) {
                    low = mid + 1;
                }
                else if (element > key) {
                    high = mid - 1;
                }
                else {
                    return mid;
                }
                return -1;
            }
        };
        /* example basis of recursive function
            multipleSelf(5,3) -> 125
        */
        self.multipleSelf = function (times, remain) {
            if (remain === 0) {
                // unwind condition
                return 1;
            }
            else {
                // wind condition execution context
                return times * self.multipleSelf(times, remain - 1);
            };
        }
    }]);
})();