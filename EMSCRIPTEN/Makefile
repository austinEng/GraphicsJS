CC=emcc
SOURCES:=$(wildcard *.cpp)
# EXPORTS_FILE=canvas_exports.txt
# LDFLAGS=-O0 --llvm-opts 0
# OUTPUT=canvas.js

# all: $(SOURCES) $(OUTPUT)

# $(OUTPUT): $(SOURCES) 
# 	$(CC) $(SOURCES) --bind -s FULL_ES2=1 -s EXPORTED_FUNCTIONS=@$(EXPORTS_FILE) -std=c++11 $(LDFLAGS) -o $(OUTPUT)

# clean:
# 	rm $(OUTPUT)
# 	rm $(OUTPUT).map

canvas: $(SOURCES)
	$(CC) $(SOURCES) --bind -s NO_EXIT_RUNTIME=1 -s FULL_ES2=1 -s EXPORTED_FUNCTIONS=@canvas_exports.txt -std=c++11 -o build/canvas.js

install:
	cp build/* ../CLIENT/emscripten/