describe("classable.js microframework", function () {
  beforeEach(function () {
    this.A = CObject.extend();
    this.A.prototype.attrA = function () { return true };

    this.B = this.A.extend();
    this.B.prototype.attrB = function () {};

    this.C = this.B.extend();
    this.C.prototype.attrC      = function () {};
    this.C.prototype.initialize = function () {};
    spyOn(this.C.prototype, 'initialize');

    this.a = new this.A();
    this.b = new this.B();
    this.c = new this.C();
  });

  describe("when object of deeply-derived class is created", function () {
    it("should be instance of each class across its inheritance path", function () {
      expect(this.c instanceof this.C).toBeTruthy();
      expect(this.c instanceof this.B).toBeTruthy();
      expect(this.c instanceof this.A).toBeTruthy();
    });

    it("should have its constructor called", function() {
      expect(this.C.prototype.initialize).toHaveBeenCalled();
    });

    xit("should not have its explicitly hidden constructors called", function () {
    });

    it("should have all atributes from its inheritance path", function () {
      expect(this.c.attrC).toEqual(this.C.prototype.attrC);
      expect(this.c.attrB).toEqual(this.B.prototype.attrB);
      expect(this.c.attrA).toEqual(this.A.prototype.attrA);
    });

    it("should reflect changes to prototype dict of its base class", function () {
      this.C.prototype.attrB = 255;
      expect(this.c.attrB).toEqual(255);
      this.C.prototype.attrB = 0;
      expect(this.c.attrB).toEqual(0);
    });

    it("can access overloaded members via _super of its class", function () {
      this.C.prototype.attrB = 100;
      expect(this.c.attrB).toEqual(100);
      expect(this.C._super.attrB).toEqual(this.B.prototype.attrB);
    });
  });
});
